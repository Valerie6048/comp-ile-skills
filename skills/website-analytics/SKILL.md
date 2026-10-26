---
name: website-analytics
description: "Set up and maintain website analytics with Google Analytics 4 (GA4), Microsoft Clarity, or both. Guide clients from account creation and ownership through tracking plans, installation, verification, access management, and repairs on existing websites. Use for analytics onboarding, missing or duplicate events, and ongoing tracking maintenance."
---

# Website Analytics

Help a company establish and maintain useful website measurement, including when
it has no analytics accounts. Support three modes: new setup, audit/repair, and
maintenance. Work with the user's chosen stack and language. This skill can be
used independently on any suitable existing website.

## Establish the mode and reference

Read the existing brief, code, analytics notes, and available account information
before asking questions. Reuse adequate answers. Ask in small groups about the
business outcome, domain/environments, company contact, current accounts/access,
selected providers, and consent requirements that affect the work. GA4, Clarity,
and using both are valid choices; do not require both services.

- **New setup:** establish ownership and account access, define measurement,
  implement, and verify. An existing login does not imply an Analytics account,
  GA4 property, web stream, or Clarity project already exists.
- **Audit/repair:** compare the installed trackers and actual behavior with the
  intended configuration. Preserve usable accounts and historical continuity;
  fix the cause rather than creating replacement properties by default.
- **Maintenance:** read the configuration record, investigate the requested
  change or health check, make scoped changes, and update the record.

Read [account-and-access.md](references/account-and-access.md) when creating,
recovering, or managing accounts and access. Guide each missing step from the
client's current starting point. Use available tools to execute authorized steps;
when direct account access is unavailable, give precise instructions and continue
work that does not depend on the missing access. Never claim guided steps were
executed. Let the user handle credentials, recovery details, OTPs, and CAPTCHA.

Keep the company in control through a company-designated administrator and invite
named maintainers with suitable roles. Existing authorization applies to routine
steps within scope; ask only for missing consequential decisions or actions not
already authorized. Creating accounts for a client does not authorize unrelated
sharing, publishing a website, paid subscriptions, or deletion of historical data.

**Ready to implement when:** selected providers, business goals, installation
targets, ownership/access status, and consent behavior are clear. Record missing
IDs or account steps as dependencies while preparing code and the tracking plan.

## Define what to measure

Keep a compact tracking plan with action, exact trigger, provider, event name,
allowed parameters, business meaning, and acceptance check. Start with actions
relevant to the site, not a fixed event bundle. For a company profile, useful
candidates include contact clicks, successful inquiries, document downloads, and
service detail views.

A WhatsApp/email/phone click demonstrates intent, not a received inquiry.
Use GA4's recommended `generate_lead` only for a confirmed lead outcome, such as
successful server acceptance of an inquiry. A submit-button click or optimistic
success message is insufficient. Decide which outcomes should be GA4 key events
with the client. Clarity session behavior and custom events supplement the plan;
provider totals are not expected to match exactly.

Use stable identifiers and categories. Exclude names, email addresses, phone
numbers, message text, and URL/query values containing personal data from event
payloads. Inspect automatic collection as well as custom events; sanitizing only
custom parameters can leave sensitive page URLs and titles exposed.

## Implement the selected providers

Read only the provider references needed:

- [ga4.md](references/ga4.md): account/property/stream setup, direct Google tag or
  GTM installation, event handling, pageviews, and consent mode.
- [clarity.md](references/clarity.md): project setup, installation, masking,
  consent signals, and optional custom events.

Inspect existing plugins, tag managers, scripts, framework integrations, CSP,
and deployment configuration before adding code. Use one installation path per
provider; do not inject a second tracker through GTM and application code.
Keep production data separate from development/preview traffic, using the
existing environment strategy or a documented production-domain gate and an
explicit test destination. Do not silently send local test traffic to production.

Establish the consent behavior before enabling collection. Reuse the existing
consent manager where possible; distinguish denied storage from no network
collection. Follow the client's selected behavior and current provider guidance.
Do not infer permission for ads features from an analytics request. Preview or
deployment follows the user's authorized scope.

**Implemented when:** configuration is reviewable, tracking matches the plan,
duplicate installation paths have been resolved, and environment and consent
behavior are implemented or explicitly recorded as outstanding dependencies.

## Verify, maintain, and hand over

Read [maintenance-and-verification.md](references/maintenance-and-verification.md)
for acceptance checks, troubleshooting, health checks, and account handover.
Verify browser behavior and provider receipt when access allows. Separate code
prepared, browser transmission observed, and provider receipt confirmed. If a
required check needs unavailable access or a deployment, report that exact gap.

Keep a project-local configuration record, using
[analytics-record.md](assets/analytics-record.md) when useful. Store ownership,
IDs, installation locations, the tracking plan, consent/masking decisions,
verification evidence, and maintenance history. Keep client records out of this
shared skill package and private access details out of public repositories.

Maintenance includes tracking checks after site/domain changes, event repairs,
new CTA/form instrumentation, consent/masking review, and authorized access
changes. Agree a cadence when recurring work is requested; this skill alone does
not run scheduled checks. Set up monitoring only through available scheduling
tools when requested, with notification conditions and an accountable contact.

**Done when:** the requested setup or repair is verified to the available level,
the company can access its resources, and the record explains what works, what
remains pending, who maintains it, and how to continue or disable collection.
State unfinished requirements rather than reporting a complete integration.
