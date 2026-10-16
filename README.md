# Subster Paudel — Portfolio

Personal portfolio for Subster Paudel, built with **Next.js (App Router) + TypeScript + MDX**
as a faithful recreation of the [Sawad](https://sawad.framer.website/) Framer template UI:
dark theme, sticky white profile card, oversized two-tone headings, orange/lime accent
cards, list-style sections, and a contact form — plus real pages for blog posts and
project case studies.

The site is a **static export** (`next build` → `out/`), so it can be hosted anywhere.

```
app/
  layout.tsx            html shell, Poppins (next/font), nav, footer, client effects
  page.tsx              home page (profile card + all sections)
  globals.css           design tokens, layout, breakpoints, sub-page + prose styles
  blog/[slug]/page.tsx  blog post pages   (content/posts/*.mdx)
  projects/[slug]/      project pages     (content/projects/*.mdx)
  not-found.tsx, icon.svg
components/             Nav, ProfileCard, Hero, Sections, ContactForm, Footer, Icon, ClientEffects
lib/data.ts             ALL site content: name, bio, socials, stats, skills, projects, experience, tools, posts
content/                long-form MDX for posts and projects
public/assets/          profile cut-out, social preview (og.png), project thumbnails, tool logos
legacy-static/          the original plain-HTML version (not used by Next.js; safe to delete)
```

## Develop

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

## Build & preview the static export

```bash
npm run build
```

```bash
npm run preview
```

`npm run build` writes the whole site to `out/`; `npm run preview` serves it locally.

## Customize

| What | Where |
| --- | --- |
| Name, role, bio, email, site URL | `lib/data.ts` → `site`, `profile` |
| Profile photo | `public/assets/profile-cutout.webp` — a **transparent** head-and-shoulders cut-out (≈ 755×700). It sits on the orange frame with the head popping slightly above it, and zooms in a little on hover. To replace it, remove the background (e.g. [rembg](https://github.com/danielgatis/rembg) with the `birefnet-portrait` model), crop from just above the hair to mid-chest, export WebP with alpha, and update `profile.photoSize` in `lib/data.ts` |
| Social preview image | `public/assets/og.png` (1200×630) |
| Social links | `lib/data.ts` → `socials` |
| Stats & skill cards | `lib/data.ts` → `stats`, `skills` |
| Projects (list + pages) | `lib/data.ts` → `projects`, body text in `content/projects/<slug>.mdx` |
| Experience | `lib/data.ts` → `experience` |
| Tools | `lib/data.ts` → `tools` (logos from [simple-icons](https://simpleicons.org/) in `public/assets/icons/`) |
| Blog posts (list + pages) | `lib/data.ts` → `posts`, body text in `content/posts/<slug>.mdx` |
| Colors / fonts / spacing | `:root` tokens at the top of `app/globals.css` |

Adding a post or project = add an entry to the array in `lib/data.ts` **and** create the matching
`.mdx` file. Slugs must match. Pages are generated at build time (`generateStaticParams`).

### Contact form

Set `site.formEndpoint` in `lib/data.ts` to a URL that accepts `POST` with
`Accept: application/json` — e.g. a free [Formspree](https://formspree.io) form.
While it is empty, submitting opens the visitor's email client addressed to `site.email`.

## Deploy

- **Vercel / Netlify / Cloudflare Pages**: import the repo; build command `npm run build`, output directory `out`.
- **GitHub Pages / any static host**: upload the `out/` folder. (For a project-page URL like
  `user.github.io/repo`, add `basePath: '/repo'` to `next.config.mjs`.)
- If you later need server features (API routes, ISR), remove `output: 'export'` from
  `next.config.mjs` and deploy to a Node host such as Vercel.

## Credits

Layout and visual language adapted from the Sawad Framer template by Templyo.
Icons: [Lucide](https://lucide.dev) (UI), [simple-icons](https://simpleicons.org) (brand logos).
Font: [Poppins](https://fonts.google.com/specimen/Poppins).
