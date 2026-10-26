# Publishing to npm

This guide covers publishing npm releases. Configuration alone does not publish
a package. GitHub source installation is an alternative distribution path.

## Details to confirm

- Package name: `@niinya/comp-ile`. Check existing releases with
  `npm view @niinya/comp-ile name version --registry=https://registry.npmjs.org/`.
  An E404 means no package was found; network/authentication failures do not
  establish availability. npm can still reject a name at publication time.
- npm account: the maintainer needs an account with permission to publish the
  chosen name. The scope belongs to the npm account `niinya`.
  The executable stays `comp-ile`.
- License: MIT, declared in `package.json` with the full text in `LICENSE`.
  The copyright notice uses the repository owner's public handle, `Valerie6048`.
- Author (optional): add a public display name and optional public URL to the
  `author` field if desired. An email address is not required.
- Version: `0.2.0` is the current source version. Check that the chosen
  name/version has not already been published. Every release needs a new version.

## Validate locally

From the repository root:

```sh
npm test
npm pack --dry-run
npm publish --dry-run
```

Review the file list: it should contain the CLI, skill, references, assets, and
documentation. The `files` allowlist controls the package contents; npm also
includes standard files such as `package.json`, README, and LICENSE. No build
step or runtime dependency installation is required. `prepublishOnly` runs the
test suite before publishing.

## Log in and publish

Run login in your own terminal and complete npm's browser authentication:

```sh
npm login --registry=https://registry.npmjs.org/
npm whoami --registry=https://registry.npmjs.org/
```

Do not paste passwords, tokens, or one-time codes into chat or commit them to
the repository. Direct publication requires npm's current authentication and
2FA requirements to be satisfied.

After reviewing the package and confirming the release:

```sh
npm publish --access public
```

The configuration explicitly targets the public npm registry. This command
publishes the package publicly; local validation does not perform this step.

## After publication

For the scoped package `@niinya/comp-ile`, verify and install with:

```sh
npm view @niinya/comp-ile version
npx @niinya/comp-ile@0.2.0 init ./website --dry-run
npm install -g @niinya/comp-ile
comp-ile init
```

Alternatively, explicitly select the executable with:

```sh
npx --package=@niinya/comp-ile@0.2.0 comp-ile init ./website --dry-run
```

The installation guides show registry commands. Keep their version examples
current when releasing updates. GitHub installation remains an alternative for
source snapshots.

On Windows, use `npm.cmd` and `npx.cmd` if PowerShell blocks `.ps1` wrappers.

References: [npm publication guide](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/)
and [package metadata](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/).
