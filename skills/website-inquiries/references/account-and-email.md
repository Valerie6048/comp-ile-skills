# Service onboarding and email delivery

## Choose and establish services

Inspect existing SMTP/API email configuration, hosting, persistent storage, DNS,
and inbox tools. Reuse suitable company services. A managed form inbox can own
persistence and notifications if its behavior meets the requested workflow;
do not assume every form-to-email endpoint stores inquiries. Check current
provider limits, required plans, test restrictions, and deployment support before
choosing. Do not prescribe a paid service or migrate providers without need.

If starting from zero, guide account signup, company-controlled administrator,
project/site creation, sender domain setup, API/SMTP access, and antispam widget
registration where needed. Use a company-designated identity and invite named,
authorized maintainers with suitable access. Let the user handle passwords,
verification, MFA, recovery, and terms requiring their action. Guide exact next
steps when account/DNS tools are unavailable, without marking them completed.

Confirm the sender identity, approved internal recipients, and test mailbox.
Read current provider instructions for domain verification and required DNS
records. Preserve existing mail delivery: inspect current DNS, avoid adding
duplicate SPF policies for the same name, and do not replace MX records merely
to enable outbound transactional email. Use the provider's specific record names
and values; do not guess DKIM keys. Consider a sending subdomain when suitable.
Verify domain status before reporting production sending as ready.

Keep sending credentials, CAPTCHA secrets, and webhook signing secrets only in
the server environment or secret manager. Use appropriately scoped keys; keep
development/preview destinations isolated. A public CAPTCHA site key is expected
in the browser; its secret is not. Record variable names and ownership without
copying secrets into project notes, screenshots, chat, or Git.

## Internal notification and optional acknowledgment

Use a verified company sender as `From`. Set a validated visitor address as
`Reply-To` when useful; do not impersonate the visitor's domain in `From`.
Internal `To`/`Cc`/`Bcc` destinations come from server configuration, never from
the public request. Validate header fields with the mail library and reject
CR/LF injection. Escape untrusted values in HTML templates; include a useful
plain-text version. Do not treat inquiry text as executable template markup.

Include an inquiry reference, relevant summary, and a safe staff link or reply
path. Choose how much personal content belongs in email with the client. Do not
expose other customers' inquiries through guessable public reference URLs.

Acknowledgment to the visitor is optional and happens only after acceptance.
Use a fixed receipt template with the company identity and inquiry reference;
do not echo arbitrary submitted content, attachments, or attacker-controlled
links to a supplied email address. Limit acknowledgments per submission and
recipient to reduce email-bombing abuse. Syntax validation and CAPTCHA do not
prove ownership of an address; use a verification flow if ownership matters.
Do not add marketing subscriptions or claim a response deadline without scope.

## Delivery, retries, and provider evidence

Store notification state separately from inquiry acceptance. With an application
database, persist an outbox/job alongside the inquiry transaction where possible;
with a managed service, verify equivalent persistence and failure recovery.
Use a durable worker/queue, or a documented staff retry path, for pending jobs.
Do not declare automatic retry unless a real executor is configured.

Use stable per-inquiry, per-message-kind idempotency keys for provider sends when
supported. Track provider message IDs and state locally; provider deduplication
windows are finite. On timeout, reconcile uncertain sends before blindly
resending. Apply bounded retries/backoff to transient errors. Surface permanent
failures and hard bounces for correction; do not retry them indefinitely.

Distinguish queued, provider-accepted, delivered, bounced, and failed states.
Delivery normally means acceptance by a recipient mail server, not guaranteed
inbox placement or reading. Keep provider receipt pending when unavailable.
If webhooks are implemented, verify signatures against the raw body before
processing and deduplicate callbacks. Handle delayed/repeated/out-of-order
events without reverting a known delivery outcome to an earlier state.

## Official references

These are concrete provider examples, not mandatory services. Verify current
API/UI and DNS instructions for the actual provider chosen:

- [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction)
- [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys)
- [Resend webhook signature verification](https://resend.com/docs/webhooks/verify-webhooks-requests)
- [Cloudflare Turnstile onboarding](https://developers.cloudflare.com/turnstile/get-started/)
