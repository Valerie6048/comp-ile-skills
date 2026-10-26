# Verification, maintenance, and handover

## Acceptance checks

Use synthetic inquiry content and explicitly designated test recipients. Use
provider test modes and official challenge test keys where possible; they do
not establish that production domain/key configuration works. Keep test traffic
separate or clearly labeled. Do not send real customer inquiries to debug a form.

| Scenario | Expected evidence |
| --- | --- |
| Valid inquiry | Accepted reference, one durable record, a retrievable staff entry, and the intended notification job |
| Required/invalid/oversized input | Server rejection and helpful UI state; no accepted lead or email |
| Spam/challenge failure | No new accepted inquiry or email; useful recovery for legitimate visitors |
| Expired/reused token or unexpected hostname/action | Rejection for new submissions and a working challenge-reset path |
| Rate limit reached | Controlled rejection without extra email work; recovery after the intended window |
| Double-click/concurrent matching requests | One accepted inquiry and one notification intent per message kind |
| Lost response and retry | Safe matching receipt without duplication; changed payload cannot reuse acceptance |
| Storage unavailable | Truthful failure; no successful-receipt message or acknowledgment |
| Email timeout/rejection | Inquiry retained, delivery status visible, and bounded/manual retry works |
| Provider webhook replay/tampering | Invalid signature rejected; repeated valid callbacks do not duplicate work |
| Acknowledgment abuse | Fixed receipt and per-recipient limits; no arbitrary-content email relay |
| Staff/privacy controls | Unauthorized read/export blocked; no personal values in URLs, logs, or analytics |

Run the project's relevant build/type/unit/integration checks for the changed
parts. Verify keyboard operation, labels, errors, loading, success, failure, and
mobile form layout. Confirm an actual staff retrieval path, not just a database
write visible to the developer. Test deployments must use persistent storage
and an environment-specific email/antispam configuration.

Report code readiness, inquiry persistence, provider email acceptance, and
delivery confirmation separately. Include date/environment, synthetic inquiry
reference, redacted message IDs, and the observed outcome. If account access,
DNS, deployment, or a mailbox is unavailable, state the exact verification gap
and next action; do not call the production flow complete.

## Repair and maintenance

Trace failures through browser request, server validation/bot checks, persistence,
notification job, provider response, and destination. Compare the last working
configuration before replacing services. Check expired credentials, sender/DNS
status, sandbox restrictions, changed recipients, limits, storage availability,
and challenge domains. Avoid weakening abuse controls just to make a test pass.

Review pending/failed jobs and bounces before retrying. Reconcile uncertain sends
against provider IDs/status; a timeout may have followed a successful send.
Preserve accepted records when correcting delivery. Record retry scope and
results so a bulk repair does not resend every historical notification.

After changes to forms, hosting/domain, DNS, email provider, proxy/rate limiting,
or challenge keys, repeat affected checks. Rotate credentials using the actual
provider procedure and update all intended environments. Apply retention or
deletion only within the client's agreed scope; do not erase records as cleanup.

For recurring checks, agree cadence, owner, observable failures, notification
conditions, and whether live synthetic email is authorized. Configure a scheduler
only when requested and supported. Keep quiet on unchanged, non-actionable
states unless periodic reports are requested. A reachable page is not evidence
that submission, storage, and email all work.

## Handover

Use [inquiries-record.md](../assets/inquiries-record.md) or update the existing
project record. Include company administrators, resource/configuration locations,
sender and approved recipients, data location/access/retention, field and abuse
rules, templates, delivery status/recovery, verification, and unfinished work.
Demonstrate how staff find an accepted inquiry when email fails. Confirm company
access before removing maintainers; revoke only authorized access/credentials.
Explain how to disable sending or pause the form while preserving existing data.
