# Google Analytics 4

Use current official documentation for provider behavior and framework-specific
integration. Inspect the existing installation before choosing a method.

## Setup and installation

1. Follow [account-and-access.md](account-and-access.md) for missing identities,
   Analytics account, property, stream, and permissions. Confirm the website URL,
   reporting timezone, currency, and measurement ID with the project record.
2. Choose a direct Google tag, a maintained framework/CMS integration, or GTM.
   Prefer the existing working path. For a new simple site, a direct integration
   can suffice; GTM is useful when the client's workflow needs tag management.
   Do not require it for all sites or combine methods for the same destination.
3. Install once in the site's shared shell using the stack's loading mechanism.
   Preserve CSP protections; add only provider-required sources after checking
   actual blocked requests. Document configuration and how to disable it.
4. Inspect enhanced measurement in the stream. It can already collect events
   such as outbound clicks, downloads, and form interactions; decide where it
   suffices and where an intentional business event is still required.

Do not replace an existing property or erase settings merely to obtain a clean
setup. Record deliberate changes to streams, retention, filters, key events, or
data-sharing settings and their effect. Avoid unrelated advertising links.

## Pageviews and business events

Choose one pageview strategy based on the router and stream settings. GA4's
config command can send an initial pageview, and enhanced measurement can send
pageviews on browser history changes. Manual events layered on these can double
count. Setting `send_page_view: false` does not alone disable enhanced
measurement's history-based collection. Test initial load, client navigation,
back/forward, and reload with the actual configuration.

Use GA4 recommended events when their meaning matches the action. A confirmed
inquiry may use `generate_lead`; a WhatsApp click can use a documented custom
event such as `contact_click` with `contact_method: whatsapp`. A click does not
prove a conversation or sale. Select key events according to client goals.

Trigger confirmed-lead events after actual successful processing. Check invalid
submission, server failure, retries, and rerenders so they do not create false
or repeated leads. Do not assume arbitrary custom event IDs deduplicate GA4
events. Only add Measurement Protocol/server tracking if the requested outcome
requires it; never expose its API secret in browser configuration.

Pass only useful, non-personal parameters such as service category or CTA
location. Inspect page URLs, titles, referrers, enhanced measurement, and GTM
variables for personal data too. Do not forward full `mailto:`, `tel:`, or
prefilled WhatsApp URLs as event labels. Use destination categories rather than
raw contact strings. Add custom definitions only for parameters the client needs
to report on; sending a parameter alone does not create a report dimension.

## Consent and verification

Read the existing CMP implementation and client's collection policy. Google
supports basic and advanced consent mode: advanced mode can send cookieless
pings while storage is denied. Do not describe storage denial as a guarantee of
zero requests. For a requirement of no collection until opt-in, block the tag
until consent. Set default states before relevant tags run, and update them
from actual choices, including rejection, persistence, and withdrawal. Handle
analytics and advertising choices independently; do not automatically grant
`ad_storage`, `ad_user_data`, or `ad_personalization` for analytics consent.

Use [maintenance-and-verification.md](maintenance-and-verification.md). Check
the measurement destination and event parameters in the browser, then confirm
controlled test events in DebugView/Realtime when accessible. Standard reports
can lag. Do not interpret an accepted network request as proof of reporting
visibility, or use a missing delayed report as reason to reinstall blindly.
Disable temporary debug configuration after the check.

## Official references

- [Create account, property, and stream](https://support.google.com/analytics/answer/9304153)
- [Web collection](https://developers.google.com/analytics/devguides/collection/ga4/web)
- [Pageviews and duplication](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Single-page applications](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
- [Recommended events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [Consent implementation](https://developers.google.com/tag-platform/security/guides/consent)
- [Avoid collecting personal information](https://support.google.com/analytics/answer/6366371)
- [DebugView](https://support.google.com/analytics/answer/7201382)
