# Quality checks and handoff

Match checks to the changes. For a revision to one section, test that section and
affected interactions; do not repeat the entire workflow without a reason.
For a new website, check all pages and main paths that were built.

Record each check as passed, needs improvement, not applicable, or unverified.
Include concise evidence such as the command, viewport, route, or observed
behavior. Do not equate code review with browser testing.

## Brief alignment

Use the latest user request and applicable brief/specification as the reference.
For each material requirement within scope, check the visitor-facing outcome
and evidence that it is met. For small revisions, assess the changed parts and
their impact; a passing build does not compensate for missing or incorrect
requirements. This assessment covers:

- Visitors can find the industry, services, target customers, and contact details.
- Each material claim has a user-provided source or suitable reference.
- Portfolio entries explain the company's role; sample data and conceptual
  projects are labeled. No invented client logos, testimonials, or numbers.
- Content, terminology, CTAs, and contacts are consistent across pages and languages.
- Draft placeholders are not treated as publishable content. Missing information
  is listed in the handoff notes.
- Structure, language, message, and main action follow the reference. Discuss
  additional features that change the scope against the user's request.
- Relevant acceptance criteria have evidence. If a contact channel or required
  feature is inactive, the requirement remains unmet even if the layout is complete.

## Technical quality

Check the implementation against the stack, project conventions, and changes made.
The following checks are separate from the brief alignment assessment.

### Build and behavior

- Run relevant build, lint, or type checks when the project provides them.
- Open the main page and other routes in a preview when browser tools are available.
  Check direct URLs and refresh for sites with multiple pages.
- Check the navigation, mobile menu, anchors, buttons, portfolio filters, and
  language switching that were actually built. Controls must deliver their promised actions.
- Check contact URLs and encoding; do not send real messages without authorization.
- For forms, test invalid input, loading, network failure, test endpoint success,
  and duplicate submission prevention where relevant. Ensure the UI does not
  claim delivery when it only simulates a submission.
- Check missing assets, broken links, console errors, and failed requests.

### Appearance and accessibility

- Inspect narrow mobile, tablet if the layout changes, and desktop views.
  Practical example widths: 375, 768, and 1440 CSS px; add 320 px for reflow
  and any widths that expose problems. These are test choices, not complete
  evidence of standards conformance.
- Check readability, hierarchy, text/image clipping, overflow, and fixed elements
  covering content. Try text enlargement and reduced motion where relevant.
- Follow main paths with the keyboard: focus order, visible focus, menus/modals,
  buttons, and forms. Check control names, headings, landmarks, alt text, and labels.
- Measure contrast for the color pairs used, including text over images.
- Use available automated audits to help discover issues; fix relevant findings
  and retain manual checks.

### SEO, performance, and publication readiness

- Check titles, descriptions, document language, internal links, and accessible
  content according to the rendering stack. Check sharing metadata if implemented.
- Verify canonical links, sitemaps, robots, and structured data when implemented.
  An unavailable domain remains pending configuration work.
- Check image weight, dimensions, fonts, and scripts. Report scores/metrics only
  when measured, together with measurement conditions. Do not treat scores as certification.
- If publication is requested, verify the domain configuration, routes, and HTTPS
  through available tools after deployment. Otherwise, provide the preview and
  suitable instructions without publishing on your own.

## Handoff

Report brief alignment and technical quality separately. Use a short paragraph
for small tasks or a table when many requirements need tracking. For each assessment,
state unfinished findings and verification limits; passing one does not
automatically mean passing the other.

Provide the code location or preview URL, run instructions, where to edit services,
portfolio entries and contacts, key decisions, and completed checks. Explain what
remains a draft, which integrations are inactive, and what must be done before
publication. If a build or browser is unavailable, state the specific limitation
and checks still needed; hand over the completed work.

Avoid claims such as "fully WCAG conformant," "completely secure," "guaranteed SEO,"
or "production ready" when the evidence and check scope do not support them.
