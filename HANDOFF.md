# Handoff to Claude Code — MasterTechhomesolution

Updated: 2026-09-17. Workspace: `D:\Mastertech`. Shell: Windows PowerShell.

## Read this first

The user explicitly requested a handoff because the current assistant's usage limit is nearly full. Continue the existing implementation, do not restart or replace it. The website has passed a production build, but has **not been launched or visually tested in a browser**. Do not claim it is presentation-ready until completing the remaining QA and polishing.

Read `AGENTS.md` first. The user added a permanent project-wide requirement: every design and implementation decision must support **Google SEO, Google Business, and AI Search**.

The user wants a complete premium Thai corporate website, locally viewable first. They will connect GitHub and Vercel themselves later. Do not deploy or connect external accounts.

## Latest confirmed user decisions

- Website name: **MasterTechhomesolution** (exact spelling provided by user).
- Original legal/company name: **MASTER SCIENCE AND TECHNOLOGY CO., LTD.**
- Original short company name: MASTER SCIENCE & TECHNOLOGY; Mast Tech branding assets supplied.
- The website header currently styles the brand as MASTERTECH / HOME SOLUTION; company legal identity is separate in central config.
- User supplied legacy company website: https://www.mastercraneandlift.com/contact-us/
- Legacy site says บริษัท มาสเตอร์ แมคคาโทรนิคส์ จำกัด, a different legal name. We explicitly asked whether to reuse its contact details for the new website. User confirmed: **“ใช้เบอร์และที่อยู่เดิมได้เลย”**.
- Use phone **02-956-9876** and address **36/19 หมู่ 1 ถนนเลียบวารี ซอยเลียบวารี 61 แขวงโคกแฝด เขตหนองจอก กรุงเทพฯ**.
- Legacy site displays Monday–Saturday, **08.00–17.00**. This is in the current config.
- Email on the old site was hidden behind Cloudflare email protection in the web text extraction. We did NOT recover or invent it. `COMPANY_EMAIL` is blank.
- A LINE QR image was provided locally and is used. `COMPANY_LINE` remains blank because a direct LINE URL has not been verified. QR popup works in implementation, but has not been browser tested or decoded.
- Do not repeat the question about reusing phone/address; user has already approved it.

## What was in the project initially

There was no initialized application. Only these supplied assets existed; originals have been preserved:

- `Product/106882_0.jpg` through `Product/106893_0.jpg`: 12 catalog pages, all 1521×1075.
- `Mock/269037.jpg`: 1672×941 primary website visual reference, navy/blue/magenta architecture with elevator and smart locks.
- `Mock/1789638008461.jpg`: 582×386 secondary website visual reference.
- `Company Logo/โลโก้ มาสเทค.png`: 1024×1024 Mast Tech logo.
- `Brand/11zon_cropped (3).png`: 1200×1200 Neramit logo.
- `Company Contact/107384.jpg`: 540×540 LINE QR code.

All 17 supplied images were visually inspected using a contact sheet (`.inspection/assets.jpg`, ignored by Git). The primary mock and glass elevator catalog were also opened individually. Do not replace real product imagery with unrelated stock images.

Catalog classification:

| File | Content |
| --- | --- |
| 106882 | Ceiling, handrail, floor finishes |
| 106883 | Decorative elevator doors |
| 106884 | Elevator controls and panels |
| 106885 | Panoramic/glass home elevators |
| 106886 | Hall door design |
| 106887 | Modern elevator interiors |
| 106888 | Graphite elevator interiors |
| 106889 | Champagne elevator interiors |
| 106890 | Classic elevator interiors |
| 106891 | Landing door collection |
| 106892 | Ceiling/accessory options |
| 106893 | Traction / steel belt home lift systems |

`scripts/prepare-assets.mjs` uses sharp to create 15 WebP crops from supplied images, and copies original catalogs, logos, and QR to `public/`. It ran successfully. Original product catalogs are available in product galleries.

The hero is an architectural crop from `Mock/269037.jpg`, NOT a freshly generated asset. The Smart Lock and Automatic Door images are crops from the same mock, and the data labels those items as concept imagery. Automatic-door imagery does not prove a real automatic-door model; maintain the concept disclosure. The 12 real catalog pages are all represented in product data. The secondary mock was used as reference, not a separate website asset.

## Implemented stack and actual verification

- Next.js App Router, TypeScript, React, plain semantic CSS with theme tokens, lucide-react.
- `next/image` and `next/font/google` (Noto Sans Thai + Noto Serif Thai).
- Intentionally no Tailwind dependency; the large CSS system already exists, do not rewrite just to add it.
- Installed versions shown by npm: Next 16.3.5, React/React DOM 19.3.0, TypeScript 5.9.3, lucide-react 0.577.0, sharp 0.35.4.
- `package-lock.json` exists.
- `npm.cmd run build` **PASSED**, including TypeScript, generating 36 static pages/routes.
- Initial sharp 0.34 had a high-severity advisory. Updated with `npm.cmd install -D sharp@^0.35.4`; resulting install reported **0 vulnerabilities**.
- `npm ls --depth=0` showed `@emnapi/runtime@1.11.3 extraneous`; not investigated, build works.
- No running dev/production server has been intentionally started yet.
- No browser screenshots, console checks, accessibility audits, or interactive tests completed yet.

## Files and responsibilities

- `data/company.ts`: website name, legal name, phone, email, address, LINE QR/link, business-profile URL, hours, source URL.
- `data/legacy-contact.ts`: source record, differing old company name. Its comment says do not publish before confirmation; confirmation has now arrived, so update that stale comment.
- `data/products.ts`: 14 product/solution entries, six quick-nav categories, image paths, descriptions, optional source catalog, concept flags, features.
- `data/projects.ts`: five neutral **concept** project entries; not real client portfolio claims.
- `data/news.ts`: six Thai demo educational articles, each with actual readable sections.
- `data/navigation.ts`: seven primary nav routes.
- `components/website.tsx`: global context/provider, header, sticky behavior, footer, mobile menu, native-dialog modal wrapper, quote form, contact form, search modal, LINE popup, theme panel, floating actions, presentation mode.
- `components/ui.tsx`: common server-compatible visual components, ProductCard, PageHero, section headings, process, CTA, JSON-LD helper.
- `components/catalog.tsx`: product filtering/search, mobile filters, project filters, product gallery.
- `lib/inquiry.ts`: isolated async frontend demo adapter; does NOT send/store data. Success message explicitly says it has not reached the company.
- `lib/seo.ts`: page metadata, canonical helper, breadcrumb JSON-LD, domain/indexing config.
- `app/globals.css`: full design system + responsive CSS, ~53 KB. Themes are `data-theme="midnight"` and `data-theme="luxury"` on `<html>`.
- `app/layout.tsx`: Thai language, fonts, metadata, organization JSON-LD, pre-paint theme initialization, global Website wrapper.
- `app/robots.ts`, `app/sitemap.ts`: real-domain-gated indexing.
- `.env.example`: `NEXT_PUBLIC_SITE_URL=` and `SITE_INDEXABLE=false`.
- `AGENTS.md`: permanent SEO/Google Business/AI Search/data-integrity rules.

## Routes already implemented and built

- `/`: full homepage.
- `/products`: 14-entry catalog, text search, category filters, mobile filter panel.
- `/products/[slug]`: 14 static product detail pages, image + original catalog gallery where supplied, features, use cases, finish guidance, inquiries, related products.
- `/services`: seven service categories, seven-step process, care information.
- `/projects`: filterable conceptual portfolio.
- `/projects/[slug]`: five concept detail pages; explicitly noindex, neutral location/status.
- `/about`: company introduction, mission, vision, values, honest history placeholders.
- `/news`: six article cards.
- `/news/[slug]`: six full article templates, TOC, sections, related links.
- `/contact`: confirmed phone/address/hours, map-search link, QR access, demo form, LocalBusiness JSON-LD.
- 404 page, `/robots.txt`, `/sitemap.xml`.

Homepage sections: architectural hero, six visual category links, trust strip, four featured products, home-elevator editorial feature, smart lock/door showcases, six property-type solutions, five reasons to choose company, seven-step process, concept projects, service banner, article preview, FAQ, inquiry CTA, multi-column footer.

## Themes / presentation

- Floating **เลือกดีไซน์** opens comparison panel.
- **Design A — Technology / Futuristic**, Midnight Technology: navy, electric blue, cyan, magenta details.
- **Design B — Luxury / Architectural**, Architectural Luxury: warm ivory, graphite, bronze, champagne.
- Themes alter more than color: hero overlay and image grading, serif heading emphasis, card borders, shadows, button treatment, icon treatment, section surfaces, decorative shapes, process markers.
- Theme persistence key: `mastertech-theme` in localStorage; inline layout script prevents initial wrong-theme flash.
- `?presentation=true` or footer control enables presentation mode; hides top strip and minor footer decoration, keeps theme switcher.
- IMPORTANT: factual concept disclosures and demo-form truthfulness remain visible in presentation mode.

## Priority work for Claude Code

1. Run locally, inspect and polish desktop/mobile screenshots before declaring done. User's overriding objective is a board-ready presentation, not merely a successful build.
2. Check widths 1440+, 1024, 768, 390, 375, 320, both themes. Check overflow, Thai font rendering, image crops, hero hierarchy, catalog cards and footer.
3. Test all routes and links, image load errors, console errors, unknown slug 404.
4. Test theme switching and persistence on reload + navigation, presentation mode, search, category filters and deep-linked category URLs, project filters, gallery thumbnails and source-image link.
5. Test quote modal from header/product/footer, native validation, success demo wording, reopen/reset, Escape, focus trap/return, background scroll lock; test contact form too.
6. Ensure mobile inquiry action stays reachable and does not overlap page controls.
7. Add README with setup, run commands, theme/config/data locations and pre-launch replacement checklist.
8. Resolve Git repository ownership usability described below; do not push/deploy. No commits have been made.
9. Final user delivery in Thai: local URL, concise built summary, routes, discovered assets, company/product config, theme instructions, data to replace, commands.

## Specific implementation risks worth inspecting

- Browser has never seen the website. CSS was written as one large pass. Screenshot-based refinement is necessary.
- Header visually separates MASTERTECH and HOME SOLUTION; exact user name is in metadata/footer/config. Confirm the styling reads well.
- Company name/title preference in original request changed to MasterTechhomesolution later; current metadata reflects new brand while preserving legal name.
- `Catalog` reads `location.search` in a mount-only effect. Navigating between category query strings while already on `/products` may not resync state. Use a route/search-aware pattern (e.g. useSearchParams with appropriate Suspense) and verify back/forward behavior.
- `presentation` state is read once on mount. Theme persists globally; query-only presentation transitions/back-forward deserve testing.
- Search modal and project filters need screen-reader feedback review; product catalog has a live result count.
- The phone input's pattern string contains punctuation and an escaped hyphen in the generated source; check browser HTML pattern validity and actual validation, particularly modern Unicode v-mode rules. Prefer robust simple validation over invalid regex.
- Catalog imagery mostly comes from cropped printed catalog layouts, not studio photo assets; inspect aspect ratios/cropping. Do not invent model specifications from them.
- Hero crop includes small mock-image decorative text. Inspect for visible garbled reference text and crop/compose tastefully as needed.
- `lib/seo.ts` currently uses `company.shortName` as OpenGraph siteName, while layout uses `company.siteName`; align with new user brand as appropriate.
- Company contact schema currently repeats address and opening-hours literals in layout/contact page instead of deriving all structured fields from the central config. Centralize structured address/hours to prevent SEO/contact drift.
- LocalBusiness and Organization JSON-LD are implemented; BreadcrumbList is currently on catalog/product/article routes. Check all relevant pages for consistent breadcrumbs if improving SEO.
- News content is explicitly demo educational guidance; no invented authors/dates. Article JSON-LD has not been implemented. Add only truthful appropriate markup, do not invent expertise or publication dates.
- Canonical URLs only emit when `NEXT_PUBLIC_SITE_URL` is set. Local preview intentionally noindex; robots disallows all and sitemap is empty until both real domain and `SITE_INDEXABLE=true` are configured. Explain this in README. Do not turn on indexing for unapproved demo content.
- Do not claim Google Business Profile has been created, verified, or connected; `GOOGLE_BUSINESS_URL` is blank.
- Old website emails remain unverified. Optionally recover public mailto/Cloudflare-protected email values from old page HTML, but do not guess. Do not transplant old company history, certificates, metrics, projects, or legal identity.

## Environment / tool problems (not application failures)

Codex's Windows sandbox repeatedly failed with:
`helper_unknown_error: setup refresh had errors`

- Default shell commands often could not start. Escalated commands worked.
- `apply_patch` intermittently failed with the same sandbox issue, but later succeeded. Most files were saved using apply_patch. Three component/config files were saved through an escalated PowerShell file-writing command.
- One attempt to write all generated sources through a single shell command failed with Windows `os error 206` (filename or extension too long). It wrote nothing. Recovered by applying each file separately. All routes, CSS, robots, sitemap now exist and built successfully.
- Do not repeat giant shell payloads; write/edit normal files in smaller operations.
- Browser skill was read and initialization attempted through browser-client at `C:/Users/User/.codex/plugins/cache/openai-bundled/browser/26.820.71523/scripts/browser-client.mjs`. It failed before initialization because the Node REPL kernel hit the same Windows sandbox error. No browser connection/tab was established.
- Microsoft Edge exists at `C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`.
- No Playwright dependency or browser test script was installed yet. Claude may use its own working browser tooling or install an appropriate dev-only test tool if needed.
- Python executable could not run; use Node/sharp for asset processing.
- No source assets were deleted. No deployments, pushes, or external messages were sent.

## Git status / ownership issue

- `git init -b main` succeeded and `.gitignore` exists.
- All application/source files are currently untracked; no initial commit, no remote.
- `.git` was created under the sandbox's Windows account (`CodexSandboxOffline`), while elevated shell runs as `User`.
- Plain `git status` as User reports **detected dubious ownership**.
- Read-only workaround that worked: `git -c safe.directory=D:/Mastertech status --short`.
- Resolve this for the user's normal shell using a narrowly scoped trusted-directory setting or appropriate directory ownership correction, with permissions as required. Never set `safe.directory=*`. Avoid unnecessary global configuration changes.
- `.gitignore` excludes node_modules, .next, .inspection, env secrets (except .env.example), build outputs, logs, .vercel, TS build info.

## Commands

Run in `D:\Mastertech`:

```powershell
npm.cmd install
node scripts/prepare-assets.mjs
npm.cmd run dev
```

Expected dev URL: http://localhost:3000 (not yet started).

Production check / local production preview:

```powershell
npm.cmd run build
npm.cmd run start
```

`npm.cmd run typecheck` is also available. Lockfile and dependencies already exist. Asset generation already succeeded; rerun only if source/crop changes warrant it.

## Original product/design constraints to preserve

- Thai primary language; premium architectural technology, not generic SaaS/e-commerce.
- Two complete visual directions, elegant visible theme selector, persistent across pages.
- Real logos preserved with object-contain, no redraw/distortion.
- No cart or invented pricing. Main conversion is quote/inquiry.
- No invented certifications, customer names, counts, warranties, awards, years, locations, or exact specifications.
- Every page needs semantic HTML, accessible controls, meaningful metadata, responsive styling, performance-conscious images, reduced-motion support.
- Project concepts must not be misrepresented as installed projects. Company timeline placeholders must not invent dates.
- Forms are presentation demos with isolated API adapter; no fake successful delivery to the company.
- User requested all pages, not only homepage, and wants to open locally before GitHub/Vercel.

## Definition of done

The site runs on localhost and has been visually and interactively checked at the requested sizes in both themes, with issues fixed. Build/typecheck pass after final edits. Git setup is usable, README exists, real contact data is consistent, demo/unknown information remains honest, and the user receives a concise Thai delivery with a working local URL and next-step config instructions.
