---
name: company-profile-website
description: "Create or improve company profile websites: turn a business brief into service and portfolio content, design and implement the site, then check its quality. Use for company profile and corporate websites that explain the business and guide prospective clients to contact it."
---

# Company Profile Website

Help visitors understand who the company is, what it does, whom it serves, the
available evidence of its capabilities, and how to start working together. Match
the deliverable to the user's goal: a brief, content, design, website
implementation, or revisions to an existing site. For website creation requests,
continue until the code and the checks available in the environment are complete.

## Scope and initial decisions

- Follow the user's language; use the website language they request.
- Read company materials and project instructions before asking questions. For
  existing sites, preserve the relevant stack, component patterns, and brand identity.
- Distinguish new builds, limited revisions, and content-only work. Complete the
  stages needed; for small revisions, use the existing brief and work directly
  on the affected parts.
- This skill does not require a single page structure or visual theme. Choose the
  structure based on the industry, audience, evidence, and website goals.
- This skill is self-contained. Use available design, browser, or hosting tools
  when relevant; do not require another skill, paid service, or specific framework.

## 1. Understand the brief and evidence

Read [brief-and-content.md](references/brief-and-content.md) when gathering
information, writing content, or assessing company claims. Use
[company-brief.md](assets/company-brief.md) as an optional form for the user;
do not request the entire form when the answers are already available.

Establish the company's identity and industry, intended audience, main services,
website goals, contact details, brand assets, and technical constraints. Ask only
questions that affect the outcome, in small groups. Missing supplementary data
does not need to stop progress: omit optional sections, state design assumptions,
and record gaps. If the company's identity or industry is unknown, ask for that
information before writing specific claims. While waiting, work on structure that
does not depend on the answers. Do not invent facts, projects, results, or contacts.

**Done when:** the identity, industry, and main services are supported by information;
the audience and goals are known or stated as assumptions. Distinguish missing
information that blocks work from optional materials that can be supplied later.

## 2. Define the message and structure

Write one sentence that explains the company, its services, and the market it
serves. Identify the visitor's main action, such as contacting the company or
viewing projects. Choose one page or multiple pages based on content needs,
navigation, and the user's preferences.

Include company information, services, evidence of work, and contact details
where supported by data. Keep mission and vision, team profiles, testimonials,
certifications, a blog, and FAQs optional. For portfolio entries, explain the need,
the company's role, the solution, and verified results. Do not add client logos or
numbers merely to fill empty space.

**Done when:** the structure, main message, CTA, and scope are clear enough to
implement; the intended outcome can be checked from a visitor's perspective.
An adequate brief can serve as the reference directly. For a new website or
complex scope that still needs a reference, read the specification section in
[project-notes.md](references/project-notes.md).

## 3. Design and implement

Read [design-and-build.md](references/design-and-build.md) when choosing layouts,
building the website, or changing interactive behavior.

Choose a visual direction based on the brand, industry, audience, and available
assets. Briefly explain design decisions, then proceed with implementation.
Do not require approval at every stage when the user has already requested a
website. Respect an explicit request to review the concept first.

Use the requested or existing stack. For a new project without a chosen stack,
select the simplest solution that meets the requirements and explain the
assumption. Use real content; put missing information in the handoff notes.
If the user requests a mockup or demo, clearly label sample data so it cannot be
mistaken for evidence of real business work.

**Done when:** the requested parts are available as reviewable code or artifacts,
use supported content, and are ready to check against the reference. Required
features that are not active remain recorded as unfinished work.

## 4. Check and hand off

Read [quality-checklist.md](references/quality-checklist.md) before handing off
the implementation. Run the build and relevant project checks when available.
Assess brief alignment and technical quality as two separate results, with depth
proportional to the changes. Fix findings within scope and distinguish completed
checks from those that could not be verified.

Provide accessible files or a preview, a summary of changes, instructions for
running the site and updating content, check results, and any data or integrations
still needed. Do not claim that the website is published, a form sends messages,
or the site fully conforms to WCAG without suitable evidence.

**Done when:** the requirements within scope have been checked, actionable findings
have been fixed, and the results and verification limits have been handed over.
If a required feature remains unmet, state that the work is unfinished.
When lengthy work needs notes, will continue across sessions, or will move to
another provider, read the continuation section in
[project-notes.md](references/project-notes.md). A handoff summary is sufficient
for a short, completed task.

Publishing, messaging companies or clients, installing analytics, and external
integrations follow the user's scope and authorization. A request for a local
website does not automatically authorize those actions. If publication has
already been clearly requested, proceed with available hosting tools and the
environment's rules without asking for the same permission again.
