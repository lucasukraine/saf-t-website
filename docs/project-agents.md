# SAF-T Connector — Project Agent Workflow

This document defines the multi-agent quality framework used during the design, development, and review of every page on the SAF-T Connector website. Each agent represents a specific perspective and set of responsibilities. Before any section is finalized, it must pass the review of each agent.

---

## Agent 1 — Web Design

**Responsible for:** Layout, visual hierarchy, typography, spacing, premium look and feel, responsiveness, motion restraint, and overall visual impression.

**Standards:**
- Every section has a clear visual entry point (eyebrow → headline → body → action).
- Typography uses the design token scale without exceptions. No inline font sizes outside the system.
- Spacing between sections is consistent and uses the `--section-py` token.
- Motion is used once per section maximum, is subtle, and respects `prefers-reduced-motion`.
- No more than two accent colors visible at once on any section.
- Dark sections use `--dark` or `--dark-section`. Light sections use `--warm` or `--paper`. No mixed mid-tone backgrounds.
- Interactive elements have clear hover states and focus rings.
- All cards and panels feel like real enterprise UI — no decorative illustrations, no clipart-like icons.

**Review checklist:**
- [ ] Hero mockup looks like a real product, not a generic gradient shape
- [ ] Section rhythm is consistent (not cramped, not stretched)
- [ ] Typography scale makes hierarchy legible at a glance
- [ ] Mobile breakpoints are clean and don't break layout
- [ ] Buttons are appropriately sized and visually clear
- [ ] No layout shifts, overflow, or truncation on any viewport

---

## Agent 2 — Conversion & B2B Positioning

**Responsible for:** Clarity of the offer, trust-building, buyer motivation, CTA logic, enterprise credibility, and reduction of friction.

**Standards:**
- The product name "SAF-T Connector" appears in the H1 or within the first 80 words.
- The primary benefit is stated before any technical description.
- Target buyers (CFO, CIO, tax director, IT lead, ERP admin) can immediately self-identify.
- CTAs are action-specific: "Замовити демо", "Обговорити проєкт" — not "Submit" or "Contact".
- Every section answers an implicit buyer question.
- Trust signals (experience, compliance background, named ERP integrations) appear early.
- Social proof or specificity replaces vague claims: use numbers, named systems, regulatory references.

**Review checklist:**
- [ ] Is the value proposition clear within 5 seconds?
- [ ] Does the hero answer: what it is, who it's for, why now?
- [ ] Does the FAQ address real objections, not hypothetical ones?
- [ ] Are there 2 CTA appearances on the page minimum (hero + closing)?
- [ ] Does the ERP section name all four supported systems explicitly?
- [ ] Is LUCAS mentioned as the company behind SAF-T Connector?

---

## Agent 3 — SEO

**Responsible for:** Organic search structure, semantic HTML, heading hierarchy, metadata, internal linking readiness, keyword naturalness, page speed, crawlability, and sitemap-readiness.

**Standards:**
- One `<h1>` per page, containing the primary keyword phrase naturally.
- `<h2>` tags define section topic — no more than one `<h2>` per visible section.
- `<h3>` tags are used for nested content (FAQ questions, card titles, list items) — not for decoration.
- `title` is 55–65 characters. `description` is 150–165 characters.
- No keyword stuffing. "SAF-T" and "SAF-T Connector" appear naturally.
- Images (if any) have descriptive `alt` attributes.
- Canonical `<link>` is present. OpenGraph and Twitter card metadata is complete.
- `robots.txt` and sitemap integration are in place.
- No render-blocking CSS or JS in the critical path.
- Internal anchor links (`#section`) use descriptive IDs that could become page slugs.

**Review checklist:**
- [ ] Title and description are set correctly for the homepage
- [ ] H1 → H2 → H3 hierarchy is logical and unbroken
- [ ] All FAQ items use proper question wording (natural language query form)
- [ ] Canonical URL is set to the production domain
- [ ] No orphaned headings (section with only a title and no body content)
- [ ] The page can be fully rendered without JavaScript

---

## Agent 4 — AEO / GEO (Answer Engine Optimization)

**Responsible for:** Structuring content so that Google AI Overviews, ChatGPT Search, Perplexity, Gemini, and other AI-powered answer engines can understand, index, and quote this page.

**Standards:**
- The homepage contains at least one short definitional block: "SAF-T (Standard Audit File for Tax) — це…" as a standalone, quotable paragraph.
- The FAQ section uses proper `<details>`/`<summary>` or `role="button"` accordion with visible question text in the DOM (not JavaScript-only).
- Each FAQ answer is self-contained and answers the question without relying on surrounding context.
- The product name, category, and regulatory context (ДПС, SAF-T UA, Ukrainian tax reporting) appear in plain text near the top of the page.
- Schema markup includes `FAQPage`, `SoftwareApplication`, and `Organization` JSON-LD.
- No critical content is hidden in carousels, tabs, or JavaScript-only elements.
- At least 2 sections have a clear "entity → attribute → value" structure (e.g., "SAF-T Connector підтримує: SAP, BAS/1C, Odoo, Excel").

**Review checklist:**
- [ ] Is there a definitional paragraph about SAF-T near the top of the page?
- [ ] Is there a definitional paragraph about SAF-T Connector?
- [ ] Are FAQ question texts in the HTML (not injected via JS)?
- [ ] Are `FAQPage` and `SoftwareApplication` JSON-LD schemas present?
- [ ] Is the "who must file SAF-T" question answered factually?
- [ ] Is regulatory context (Мінфін, ДПС, роки впровадження) stated?

---

## Agent 5 — Technical Quality

**Responsible for:** Clean Astro architecture, reusable components, accessibility, performance, responsive behavior, code quality, maintainability, and build correctness.

**Standards:**
- Every page section is its own Astro component with scoped styles.
- No inline CSS, `style=""` attributes, or magic numbers outside design tokens.
- No JavaScript unless functionally required (FAQ accordion, scroll-triggered header).
- All interactive JS is in `<script is:inline>` or a `.ts` file with no framework dependencies.
- `BaseLayout.astro` handles all `<head>` metadata, schema, and font preloading.
- Fonts are self-hosted with `font-display: swap`.
- No external CSS frameworks or UI libraries.
- All images have `width` and `height` attributes. No layout-shifting resources.
- The project builds with `astro build` with zero errors and zero warnings.
- Heading order is validated with `axe` or equivalent in manual review.
- Focus states are visible for all interactive elements (keyboard nav).
- Contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text.

**Review checklist:**
- [ ] `astro build` completes with 0 errors
- [ ] No unused imports or dead component files
- [ ] All `<a>` tags with only icon content have `aria-label`
- [ ] Mobile menu uses `inert` attribute for accessibility
- [ ] Font preload links are present for Cyrillic subsets
- [ ] No `console.error` in the build output
- [ ] `robots.txt` and sitemap are present after build

---

## Agent 6 — Self-Review / Bug-Fixing

**Responsible for:** Critically reviewing the assembled output from the perspective of a first-time visitor and a skeptical expert. Catches weak design, vague copy, SEO issues, accessibility problems, broken layout, and unnecessary complexity.

**Process:**
1. Read the page as a CFO/CIO who doesn't know what SAF-T is.
2. Read it as an IT consultant who knows ERP systems.
3. Read it as a Google Search Quality Rater.
4. Read it as a mobile user with a slow connection.
5. Run `astro build` and check for any warnings.
6. Check the rendered HTML source for schema validity and metadata completeness.

**Common issues to hunt for:**
- Headings used as visual styling (h2 where h3 is correct)
- CTA that says "more" with no context of what "more" means
- Numbers or dates that are wrong or fictional but look authoritative
- FAQ answers that are too vague ("it depends") without specifics
- Mobile text that overflows or is too small
- `alt=""` on decorative images that should be `role="presentation"`
- Missing `lang` attribute on sections with mixed-language content
- Dark sections where text contrast is borderline

**Output:** A list of specific issues with file references, corrected in the same commit.

---

## How Agents Are Applied During the Build

| Phase | Agents Active |
|---|---|
| Content draft | Agent 2 (positioning), Agent 4 (AEO structure) |
| HTML structure | Agent 3 (SEO), Agent 4 (AEO), Agent 5 (technical) |
| CSS / layout | Agent 1 (design), Agent 5 (technical) |
| Responsive pass | Agent 1 (design), Agent 5 (technical) |
| Copy review | Agent 2 (conversion), Agent 3 (SEO keywords) |
| Schema & meta | Agent 3 (SEO), Agent 4 (AEO) |
| Final review | Agent 6 (self-review, all perspectives) |
| Build + fix | Agent 5 (technical), Agent 6 (bug-fixing) |

Each new page added to the site goes through the same cycle. The agents are not separate tools — they are structured mental frameworks applied by the developer (or AI assistant) during each phase of work.
