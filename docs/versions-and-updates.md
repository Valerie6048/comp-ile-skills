# Versions, updates, and local edits

The CLI version is listed in `package.json` and can be checked with:

```sh
comp-ile --version
```

The CLI includes the skill package from the installed source version. A project's
copy changes only when `init` is run again. The CLI currently does not record
project copy versions in a separate manifest or update them automatically.

## Choose a source

Installation without a ref fetches the repository's default branch:

```sh
npm install -g github:Valerie6048/comp-ile-skills
```

For a fixed source, choose an available commit. Example initial snapshot:

```sh
npm install -g "github:Valerie6048/comp-ile-skills#de83f52413247abe4786f3cdd16a35dbbb28e1c7"
```

A tag can also be used after it has been created and pushed. Do not assume that
`0.1.0` in the metadata means a `v0.1.0` tag exists.
Refs follow [npm's GitHub installation syntax](https://docs.npmjs.com/cli/v11/commands/npm-install/).

## Update a project

1. Save website changes and any skill edits you want to retain. If using Git,
   review tracked changes; also save untracked files before updating.
2. Reinstall the CLI from your chosen GitHub ref, then check `comp-ile --version`.
   Two commits may carry the same version if metadata has not been incremented;
   keep the chosen ref if you need reproducibility.
3. In the destination project, inspect the plan:

   ```sh
   comp-ile init --dry-run
   ```

   If packaged files differ, the command reports conflicts and exits with a
   failure status. This is still an inspection step; no files have been written.

4. If you intend to replace the differing packaged files, run:

   ```sh
   comp-ile init --force
   ```

For a subset of providers, use the same `--provider` option when inspecting
and writing. The destination directory must also match. Review the changes
afterward and reload the agent if the updated content is not detected.

## What force replaces

| Project content | Result |
| --- | --- |
| Identical packaged files | Skipped without rewriting |
| Differing packaged files, including locally edited SKILL.md | Replaced with the currently installed package contents |
| Additional files not supplied by the package | Preserved |
| Old packaged files no longer included in the new version | Preserved; the CLI does not delete them |
| Website code outside destination skill folders | Not a copy target |

For company-specific needs, store data, preferences, and notes in the website
project. If you customize skill instructions, keep a copy/fork and review merges
with each update. `--force` does not merge file contents.

## Version guidance for maintainers

Record user-facing changes in [CHANGELOG.md](../CHANGELOG.md). Increment versions
when shipping package updates: patch for compatible corrections, minor for
compatible additions, and major for breaking contract changes.
For `0.x` versions, explain breaking changes explicitly.

Before tagging a version snapshot, run `npm test` and `npm pack --dry-run`,
then review documentation and skill contents. Agent guidance changes also need
relevant website scenarios; CLI tests verify installation, not model decisions.

GitHub tags and registry packages are separate distribution paths. This
repository currently distributes through GitHub, with `private: true` preventing
accidental registry publication. This guide does not create tags or publish
a package to npm.
