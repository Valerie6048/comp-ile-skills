# Microsoft Clarity

## Project and installation

Follow [account-and-access.md](account-and-access.md) if the client needs a login,
project, or team access. Confirm the project URL and ID. Use the installation
code or documented integration for that project, once per page lifecycle.
Choose direct installation, an existing CMS/framework integration, or GTM; inspect
the existing site and container so two paths do not load Clarity twice.

Use current official guidance to confirm the site's suitability for Clarity,
including its restrictions for sites targeting users under 18, before enabling
recordings. If a requested service is unsuitable, explain the specific condition
and continue with suitable measurement within scope.

Use the project ID intended for this website and environment. Keep development,
admin, authenticated, and sensitive areas outside collection unless explicitly
included and assessed in the tracking plan. Linking Clarity to GA4 is optional;
neither installation depends on linking the two accounts.

## Masking and consent

Check project masking settings and inspect dynamic content: inquiry summaries,
confirmation messages, account details, and personalized text can expose data
outside form inputs. Add explicit masking, such as `data-clarity-mask`, to
sensitive elements when appropriate. Check new recordings using synthetic data;
do not populate real customer information for verification. Masking changes do
not repair recordings already collected. Inspect URLs/query strings separately;
DOM masking does not establish that URLs are safe.

Integrate with the actual CMP or consent controls. The current Consent V2 API
uses `window.clarity('consentv2', { analytics_Storage: 'granted' | 'denied',
ad_Storage: 'granted' | 'denied' })`. These keys are case-sensitive and differ
from Google's names. Pass real, separate choices; do not grant advertising
storage just because the user allowed analytics. Verify defaults and updates
against the current project consent settings and official documentation.

Clarity can operate with limited tracking without cookies after denial. If the
client requires no collection before opt-in, gate script loading as well as
storage consent. Withdrawing consent must implement the selected collection
policy; sending a denial signal alone does not prove recording has stopped.
Verify behavior after withdrawal, including on the next page and reload.

## Events and receipt

Heatmaps and recordings are the core output. Add custom events or tags only
when they support an agreed question, such as finding recordings of contact
intent. Use stable, non-personal categories. Do not add email, phone, form text,
or raw customer identifiers to tags, event names, or optional identity APIs.
GA4 and Clarity need not have identical event taxonomies or visitor totals.

Verify a single installation, correct project destination, and expected consent
behavior in the browser. Confirm a controlled session in the project when
access permits; check route coverage, interactions, and masking. Record the time
and environment. A loaded script is not evidence of an available recording,
and heatmaps need suitable collected traffic. Report delayed/unavailable results
as pending rather than inventing a successful capture or repeatedly reinstalling.

For ongoing checks and access handover, use
[maintenance-and-verification.md](maintenance-and-verification.md).

## Official references

- [Installation](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup)
- [Project permissions](https://learn.microsoft.com/en-us/clarity/setup-and-installation/team-management)
- [Masking](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking)
- [Consent mode](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode)
- [Consent V2 API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2)
- [Client API and service restrictions](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api)
