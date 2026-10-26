---
name: website-inquiries
description: "Build and maintain website inquiry and quotation forms with server validation, spam protection, durable lead storage, email notifications, and optional acknowledgment emails. Guide email and antispam account setup from scratch, repair failed or duplicate submissions, and manage delivery and handover on new or existing websites."
---

# Website Inquiries

Help a company reliably receive and follow up website inquiries. Support new
setup, audit/repair, and maintenance. Follow the user's language and the existing
stack. Work independently of other skills; reuse existing forms, storage, email
services, and company accounts where suitable.

## Establish the inquiry workflow

Read project instructions, the existing form/backend, and available configuration
before asking questions. Establish the inquiry purpose, necessary fields,
notification recipients, storage/inbox, sender domain, acknowledgment preference,
environments, available access, and responsible company contact. Ask only for
missing answers that affect implementation, in small groups.

For new setup, guide missing email/antispam accounts and domain configuration
from the client's current starting point. For repairs, identify the failing step
and preserve existing inquiries and usable configuration. For maintenance, read
the configuration record and investigate the requested change or health check.

Use the simplest suitable workflow: an existing backend with durable storage or
a managed form service with a persistent inbox can both work. A local database
is suitable only when the actual hosting preserves it. Do not add an entire
admin application when an existing inbox or authorized staff interface suffices.
Plain WhatsApp/email links are contact channels; they do not require this full
workflow. Messaging bots, CRM automation, and marketing email require their own
requested scope.

Read [account-and-email.md](references/account-and-email.md) for service choice,
company ownership, sender verification, notification/acknowledgment configuration,
delivery status, and retries. Preserve existing authorization for routine steps;
ask only for missing consequential choices or actions outside that scope.
Account login, recovery details, OTPs, and CAPTCHA challenges remain with the
user. Use available tools for authorized account changes; otherwise guide the
exact missing step and continue independent work. Do not claim guided actions
were executed. Use explicitly designated test recipients for live email checks.

**Ready when:** the fields, destinations, storage, notification behavior,
antispam approach, and production/test environments are clear. Missing accounts,
secrets, or DNS access are recorded dependencies, not invented working services.

## Build the submission and notification path

Read [submission-and-spam.md](references/submission-and-spam.md) before building
or changing the endpoint. Enforce server validation and request limits, use
appropriate bot protection, and persist accepted inquiries before depending on
notification delivery. Preserve the inquiry when email fails. Provide staff a
documented way to find pending notifications and recover them.

Distinguish these outcomes in code, UI, and handover:

- Invalid or blocked submission: explain a useful correction or retry path;
  do not create a lead or send acknowledgment email.
- Failed persistence: do not claim the inquiry was received.
- Accepted and stored inquiry: show receipt according to the agreed workflow,
  even if notification is still pending. Do not promise an unconfirmed reply time.
- Email accepted by provider: record its message ID and delivery state; this
  does not prove the recipient received or read it.

Prevent duplicate inquiries and email sends on double-clicks, retries, and
uncertain network responses. Disabling a submit button helps UX but does not
provide server-side deduplication. Use stable submission IDs and durable
idempotency where appropriate. Bound background retries and make exhausted
failures visible. A detached promise in a short-lived serverless request is not
a reliable notification queue.

Provide accessible labels, errors, loading state, and recovery from expired
challenges/network errors. Keep safe form values available for retry without
placing inquiry content in URLs or browser analytics. Protect staff access to
stored inquiries and keep server credentials out of client bundles and public
notes. Collect only needed information and record the client's retention and
deletion arrangements. Receiving an inquiry does not imply newsletter consent.

If analytics is in scope, trigger a confirmed-lead event only after actual
acceptance, using non-personal parameters. Keep form contents and personal
contact details out of analytics and session recordings. An analytics setup is
not a prerequisite for receiving inquiries.

**Implemented when:** accepted inquiries persist, the notification path and
recovery mechanism are reviewable, failure states are truthful, and antispam
checks run on the server. Record any inactive integration as unfinished.

## Verify and maintain

Read [verification-and-maintenance.md](references/verification-and-maintenance.md)
for failure-path checks, delivery evidence, recovery, and handover. Use synthetic
inquiries, provider test modes, and designated mailboxes. Check persistence,
deduplication, rejected requests, email failure/retry, and accessible form states.
Run relevant project checks after implementation changes. Report provider or
deployment checks that cannot be performed with current access.

Maintain one project-local record; use
[inquiries-record.md](assets/inquiries-record.md) as a starting point. Record
accounts/access, configuration locations, destinations, field rules, storage,
spam controls, notification status/recovery, verification, and owner actions.
Keep client inquiry data and credentials out of this shared skill package.

Maintenance covers broken forms, domain/sender changes, spam tuning, delivery
failures, authorized recipient/access changes, and data lifecycle tasks within
scope. Scheduled checks require an explicit request and available scheduling
tools; the skill file itself does not monitor or send periodic test emails.

**Done when:** the requested flow works to the verified level, staff can find
accepted inquiries and recover notification failures, and company ownership,
maintenance instructions, evidence, and remaining gaps are handed over.
