# Project specifications and continuation

Use only the sections that fit the company profile website's needs. Create
documents in the user's website project; the skill folder contains reusable
guidance, not company-specific data. Follow existing document locations.

## Short specification

Use this when a new website or complex scope needs a reference that is not yet
available, or when the user requests a specification. If the existing brief or
documents already explain the decisions and expected results, use them directly.
Small revisions can rely on the user's request and relevant context.

For a new specification, use a location such as `docs/company-profile/spec.md`
if the project has no convention. Fill it from the conversation and available materials:

- **Goals and audience:** the business need and visitor's main action.
- **Scope:** pages or sections to create or change, their main content, and
  requested features. Record exclusions only when needed to explain the limits.
- **Decisions:** language, structure, visual direction, technology, and contact
  paths where relevant. Distinguish user decisions from open assumptions.
- **Acceptance criteria:** observable behavior or information. For example,
  visitors can find core services, understand their scope, see available
  evidence, and open the correct contact channel on mobile.
- **Materials and gaps:** content and asset references, fact status, and missing
  data or integrations. Explain which gaps block required features.

Match the length to the work. Every material requirement needs a checkable
outcome; do not invent features to make the specification appear complete.
Update affected sections after user decisions without repeating interviews when
the information is sufficient. Newer user instructions supersede the old reference.
A website creation request authorizes preparing the reference needed for the work;
approval at every stage is not an automatic requirement.

The specification is sufficient when its scope, necessary decisions, and acceptance
criteria can guide implementation and QA. Link existing materials using project
relative paths or URLs; avoid copying entire source documents.

## Continuation notes

Use these when lengthy work needs persistent context, will continue in another
session, or will move to another provider. A final summary is sufficient for a
short, completed task. Notes record the current state; they do not add goals
or replace the requested implementation work.

Update existing project notes. If no convention exists, use a location such as
`docs/company-profile/handoff.md`. Record only what is needed:

- The active goal, scope limits, and brief/specification references.
- Recent decisions and any open assumptions or questions.
- Completed, active, and unfinished work; point to relevant files, pages, and
  assets using project relative paths.
- Run/preview instructions, checks actually performed, and their results.
  Distinguish failed checks from checks that have not been run.
- Next steps and the data, access, or integrations they require.

Keep project facts and references useful across providers. Session tool names,
temporary IDs, and machine paths unavailable in the next environment must not
become dependencies. Do not include passwords, API keys, or private customer data
in notes; reference configuration locations without their values.

Notes are sufficient when the next agent can find the reference, understand the
status and limits, and choose a next step without guessing previous decisions.
When resuming, read relevant references and inspect the current code; resolve
discrepancies using the latest user instructions. Use the same reference for QA
and update the status as work changes.
