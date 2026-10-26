# Account onboarding and access

## Start from the client's actual state

Identify the company contact, company-controlled login/admin, website domain,
available account resources, and the person who will maintain them. Distinguish
login identity from analytics resources. Check for existing resources before
creating new ones; lost access is an access-recovery problem first.

If no suitable identity exists, guide the company through creating or choosing
one supported by the provider's current sign-in flow. A paid Microsoft 365 or
Google Workspace subscription is not a prerequisite to prescribe. Keep recovery
and MFA under company control. The user enters credentials and verification
codes directly in the provider UI; never request or save them in chat or notes.
Do not bypass verification or repeatedly retry a blocked signup.

Use available connectors, APIs, or browser tools for authorized work. When tools
cannot operate the account, explain the next exact UI step, expected result,
and the non-secret resource ID needed to continue. Record progress so a later
session can resume without creating duplicate accounts.

## Resource structure

- **GA4:** choose/create an Analytics account for the business, then the relevant
  property and web data stream. Record account ID, numeric property ID, stream
  ID, and the web measurement ID (`G-...`) separately. A numeric property ID is
  not a browser measurement ID. Choose the reporting timezone and currency with
  the client; note existing choices when maintaining a property.
- **Clarity:** sign in, choose/create a project for the website, confirm its URL,
  and record the project ID and installation method. Do not create a project
  for each maintainer.
- **GTM, if chosen:** use a company-controlled account and appropriate web
  container; record the `GTM-...` ID and access separately from GA4 permissions.
  A container ID is not a GA4 measurement ID. Reuse a suitable container.

Do not group unrelated clients under a shared agency resource solely for
convenience. Respect an existing agreed account structure; explain ownership
and access implications before changing it.

## Roles and ownership

Ensure a company-designated person has administrator access and can actually
open the intended account/property/project. Invite named maintainers only when
the user has authorized those recipients and roles. An invitation sent is not
proof of accepted access. Use individual access rather than shared passwords.

For GA4, property-level Editor is typically appropriate for tracking configuration;
Administrator is needed to manage users. Account-level access affects more than
one property and should be granted only when needed. Check inherited access
before promising that removing one property assignment revokes all access.

Clarity has Admin and Team member roles. Team member can view recordings and
heatmaps but cannot manage project settings, membership, or masking. A
maintainer who must change these settings needs Admin. Do not describe Member
as a read-only role. GTM has its own permissions; confirm publishing access if
container publication is part of the request.

Keep at least one company-designated admin before removing a maintainer or
leaving a project. Confirm replacement access first. Apply only the requested
access changes; do not delete properties/projects or data during routine cleanup.
If export credentials exist, review revocation when their maintainer leaves.

## Record and complete onboarding

Record resource IDs/links, company administrator, maintainer roles, invitation
status, and outstanding owner actions in the client's private project notes.
Public measurement IDs can appear in browser code; passwords, recovery codes,
OAuth credentials, and export tokens do not belong in those files.

Onboarding is complete when the intended resources exist, company access has
been verified, and implementation IDs are available. If a step requires login,
terms acceptance, or verification by the company, hand over that precise step
and keep onboarding marked pending while progressing independent work.

## Official references

Verify current UI and permission behavior when using these procedures:

- [GA4 account, property, and stream setup](https://support.google.com/analytics/answer/9304153)
- [GA4 roles and inherited access](https://support.google.com/analytics/answer/9305587)
- [GA4 user management](https://support.google.com/analytics/answer/9305788)
- [Clarity project setup](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup)
- [Clarity roles and team management](https://learn.microsoft.com/en-us/clarity/setup-and-installation/team-management)
- [GTM user permissions](https://support.google.com/tagmanager/answer/6107011)
