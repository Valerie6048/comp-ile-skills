# Verification, repair, and maintenance

## Acceptance evidence

Use the agreed tracking plan as the reference. Run the project's relevant
checks after code changes, and exercise browser behavior where tools allow.
Use synthetic interactions and an explicit test destination or authorized
production test; document test traffic so it is not mistaken for real leads.

| Check | Evidence to collect |
| --- | --- |
| Installation/destination | One intended installation path per provider, correct measurement/project ID, correct domain/environment |
| Page coverage | Initial load, route changes, back/forward, and reload behave as planned without duplicate pageviews |
| Business events | Each agreed action sends the expected event and safe parameters once per actual outcome |
| Failure paths | Invalid form, processing failure, repeat clicks, and rerenders do not create false successful leads |
| Consent | Fresh state, accept, reject, reload, and withdrawal follow the chosen policy in storage and network behavior |
| Data exposure | URLs, titles, payloads, and new Clarity recordings do not reveal the synthetic sensitive values |
| Provider receipt | GA4 DebugView/Realtime events and a Clarity test recording, where accessible |
| Company access | Company admin can open the intended resources; maintainer access matches the task |

Record status separately for code/configuration, browser transmission, and
provider receipt. Include date, domain/environment, event/session evidence,
and limitations without saving sensitive recording contents. A script present
in source, a successful build, or a network response alone is not end-to-end
confirmation. For pending dashboard results, provide the next check rather than
claiming success or waiting indefinitely.

## Diagnose before replacing

Start with the symptom and last working state. Compare the project record,
current code, deployed configuration, and provider settings. Investigate:

- Wrong ID, wrong property/project selected, absent environment variables, or
  a domain/environment gate that excludes the intended page.
- A tracker present in application code and GTM/plugin configuration together.
- Manual pageviews combined with automatic collection, repeated initialization,
  rerenders, or duplicated event listeners.
- CSP, blocked requests, browser extensions, consent state, and denied storage.
  Use a controlled browser to distinguish blocking from an integration failure;
  do not bypass visitors' privacy choices.
- Form events attached to clicks rather than confirmed processing.
- Dashboard delay, filters, timezone/range, or different event definitions across
  providers. A traffic drop does not automatically mean the tracker broke.

Make the smallest change that addresses the observed cause. Capture relevant
configuration before editing, recheck affected behavior, and record rollback.
Do not disable privacy controls, delete resources, replace IDs, or remove data
filters blindly to make a dashboard populate.

## Maintenance and handover

Review tracking after route, form, CTA, domain, consent manager, or deployment
changes. Add new events only for an agreed purpose; preserve historical event
meaning and record changes to names, triggers, or key-event definitions. Review
masking after UI changes and roles after staff/agency changes.

For recurring maintenance, agree the cadence, sites/providers, expected checks,
contact, notification conditions, and whether synthetic traffic is allowed.
Configure an automation only when requested and supported. Missing tools or
dashboard permissions limit the checks; a skill file does not itself monitor.
Prefer meaningful failure/change notifications over routine unchanged messages
unless the client asks for periodic reports. Explain what an automated check
actually observes; a reachable script does not prove correct business events.

At handover, verify company admin access before removing the outgoing
maintainer. Include resource links, IDs, installation/config locations, tracking
plan, consent/masking decisions, verification, known gaps, maintenance contact,
and how to disable or roll back collection. Remove only authorized access;
check related tokens and GTM access where applicable. Historical resource/data
deletion requires its own explicit scope and is not routine offboarding.

Use [analytics-record.md](../assets/analytics-record.md) as a compact starting
point. Update the existing project record rather than scattering conflicting
copies across sessions.
