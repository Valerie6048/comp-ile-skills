# Website design and implementation

## Choose an implementation that fits the needs

Inspect the repository, local instructions, components, dependencies, and available
build commands. Do not replace the framework or add a CMS merely to follow a
skill preference. For a new project, a static site is sufficient when content
changes infrequently and application features are unnecessary. Choose a CMS,
backend, or framework when content management, integrations, or user needs justify it.

Follow the user's chosen platform or hosting provider. If the environment provides
a dedicated website building or hosting workflow, use it according to its
instructions without making that dependency mandatory for every user.
This skill does not include a code template or vendor-specific dependencies.

## Visual direction and layout

Define colors, typography, spacing, content width, image treatment, and component
styles from the brand and audience needs. Professional design may be formal, warm,
editorial, or expressive depending on the industry. Avoid imposing one color,
card layout, animation style, or theme on every company.

Prioritize the main message and action path. Use visual hierarchy, whitespace,
readable text, and visuals that show the work when available. Navigation should
include sections that actually exist. Keep the main CTA destination consistent;
supporting CTAs can lead to services or case studies.

Start at mobile widths; adapt grids and navigation to the content. Content must
remain readable without hover. Mobile menus need a button with an accessible name,
expanded state, and appropriate keyboard behavior. Ensure fixed headers do not
cover anchor targets or focused elements. Animation should aid understanding
and respect reduced motion preferences; essential information must remain
available when animation is disabled.

## Accessibility

Use WCAG 2.2 Level AA as the target unless the user specifies a different one.
This skill's checklist covers some checks; a passing build or automated audit
does not prove full WCAG conformance.

- Use HTML landmarks, a logical heading order, document language, links for
  navigation, buttons for actions, and a skip link when repeated navigation needs it.
- All controls must work with the keyboard and have visible focus. Avoid focus
  traps; modals must manage entering, leaving, and returning focus.
- Use meaningful alt text for informative images and empty alt text for decoration.
  Icon controls need names that assistive technology can read.
- Normal text contrast must be at least 4.5:1; large text at least 3:1 under the
  WCAG definition. Do not assume all headings qualify as large text.
- For pointer targets, follow the 24 x 24 CSS px minimum or the spacing/exceptions
  in SC 2.5.8. Targets around 44 x 44 px may improve comfort; this is a design
  recommendation, not a universal WCAG AA minimum.
- Do not rely on color alone for status. Provide input labels, instructions,
  associated error messages, and appropriate status announcements.
- Check text enlargement and reflow, including narrow viewports; do not disable
  zoom. Avoid horizontal scrolling for ordinary content.

## Contact channels and forms

Choose channels from company data: phone, email, WhatsApp, or a form. Validate
destination formats; use an international number and an encoded message for
WhatsApp. Do not activate sample numbers or addresses as contact destinations.

If no backend is available, use confirmed contact channels. If the user requests
a form mockup, label submission as unconnected and do not display a false success
message. `mailto:` opens an email application; do not describe it as a message
already received by the company.

For integrated forms, implement server-side validation, loading states, real
failure and success states, appropriate spam protection, and server-side secret
management. Collect only the data needed. Privacy policies and analytics follow
the user's requirements and scope; do not add legal compliance text, trackers,
or cookie banners unsupported by the implementation. Test submissions through
a test endpoint; submissions to a production inbox require suitable authorization.

## SEO and performance

- Add a title and meta description that explain each page. Ensure crawlers can
  access the main content through rendering appropriate to the stack.
- Use internal links with anchor elements and valid hrefs. For multiple pages,
  check direct URLs, refresh, and navigation between pages.
- Use headings and descriptive text that help readers; avoid keyword stuffing
  and empty service pages.
- Add a favicon and sharing metadata when assets are available. Absolute URLs
  for canonical links, Open Graph, sitemaps, and structured data need a real
  domain; record pending domain configuration instead of inventing a domain.
- For published sites, configure robots and sitemaps for the indexing strategy.
  Previews and drafts should not automatically be indexed.
- Structured data is optional and must reflect accurate, visible facts. Do not
  invent ratings, reviews, addresses, or organizational claims.
- Optimize image sizes and formats, provide dimensions, and lazy-load images
  below the fold. Avoid lazy-loading a main image if it delays the initial view.
  Limit fonts, third-party scripts, and JavaScript to what is needed.
- Use measurements when discussing performance. Do not promise rankings,
  indexing, or specific Lighthouse scores without checks.

## Primary references

Use the chosen stack's documentation for APIs and behavior that can change.
Read these standards references when implementation or audit details require them:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
