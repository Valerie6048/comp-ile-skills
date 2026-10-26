# Submission reliability and spam protection

## Server acceptance and persistence

Define allowed fields, required values, formats, and size limits from the actual
inquiry purpose. Validate on the server even when the browser already validates.
Apply request/body limits before expensive processing, normalize carefully, and
use the data layer's parameter binding. Keep legitimate Unicode names/messages
usable. Reject unexpected fields where they could alter recipients or behavior.
File uploads require an explicit need and their own type, size, storage, and
access controls; do not add attachments by default.

Protect the endpoint with controls appropriate to its authentication model.
For cookie-authenticated state-changing actions, preserve CSRF protection.
Origin/CORS checks on a public form alone do not prevent scripted submissions.
Protect staff inboxes, exports, and individual inquiry reads with authorization;
an unguessable reference alone is not a staff access mechanism.

Store only useful inquiry data with timestamps and a reference in storage that
survives the deployment's lifecycle. Avoid local files/SQLite on ephemeral
serverless filesystems. A database, existing CRM, or managed form inbox can be
the durable destination; verify acceptance semantics and staff access.
Define retention/deletion and avoid inquiry contents in debug logs or analytics.

Treat persistence and notification as separate outcomes. When storage succeeds
but email fails, retain the inquiry and mark notification pending/failed. Return
an honest receipt according to the agreed contract. When storage fails, return
a retryable failure and do not send a success acknowledgment. Test crash/retry
boundaries so an accepted inquiry does not silently lose its notification job.

## Duplicate and uncertain submissions

Disabling repeat clicks is useful UX, but use durable submission identity and
an atomic uniqueness/idempotency rule for actual deduplication. Bind a request
key to a validated payload/session context so a reused key cannot silently
replace a different inquiry or expose another visitor's submission details.
Concurrent matching requests should create one inquiry and one notification
intent per message kind. A provider send key does not deduplicate database writes.

If the response is lost after acceptance, a matching retry should safely return
the accepted outcome without sending again. Coordinate bot-token verification
and submission idempotency: a legitimately accepted retry may carry a consumed
token. Return only a minimal receipt for a proven matching submission; do not
bypass bot checks for a new request just because it supplies an existing key.
Do not use a broad time-based duplicate filter that drops distinct real inquiries.

## Layered abuse controls

Choose controls based on exposure and observed abuse. Server validation, request
limits, rate limiting, and optionally a honeypot or challenge complement each
other. A CAPTCHA does not guarantee a human or replace recipient/email limits.
Do not add a challenge to a page that only links to WhatsApp or email.

Rate-limit the submission endpoint and email work, including by recipient where
acknowledgments are enabled. Use the platform's trusted proxy/client identity
mechanism; arbitrary forwarded headers are spoofable. A process-local counter
does not enforce shared limits across serverless instances. Handle shared
networks sensibly and document limits and recovery instead of blocking legitimate
visitors indefinitely. Keep honeypots out of keyboard/assistive-technology flows
and avoid trapping normal autofill. Do not claim honeypots alone stop all bots.

For Turnstile, register the appropriate domains and environment keys. Embed the
widget, send its token to the backend, and validate it using Siteverify before
accepting a new inquiry or sending email. Keep the secret server-side. Check
`success` and expected hostname/action where configured. Tokens are single-use
and expire after five minutes; support expiry/reset/error states and use official
test keys for automated checks. Do not reuse one token for multiple submissions.
Do not accept a request because a widget displayed a success state in the UI.

If verification is unavailable, follow a documented retry or alternate contact
path; do not silently fail open or report successful receipt. Alternative CAPTCHA
providers are valid when chosen; use their current server-verification guidance.

## Official references

- [OWASP server input validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP request limits and rate limiting](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html)
- [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Turnstile test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/)
