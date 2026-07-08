# Portfolio — Terminal Theme

A single-page developer portfolio built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Styled as a boot-sequence / terminal experience: fake OS boot on load, a live status bar (like a code editor's bottom bar), and section labels written like code comments.

## Sections
1. **Identity** — hero with animated role-cycling typewriter
2. **Architect** — about you
3. **Works** — project cards styled like code editor windows
4. **Stack** — skills with animated progress bars
5. **Timeline** — education / experience history
6. **Trophies** — awards & certifications
7. **Signal** — contact section with a form

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Editing your content

**Everything you need to change lives in one file: `lib/data.ts`.**
Every placeholder is written in capitals or prefixed `EDIT_ME` so it's easy to find and replace:

- `identity` — your name, tagline roles, status, one-line summary
- `about` — your bio paragraphs + focus areas
- `projects` — your project list (title, description, stack, links)
- `stack` — your skills grouped by category, with a 0–100 proficiency level
- `timeline` — education / work history entries
- `awards` — certifications & achievements
- `contact` — email, GitHub, LinkedIn, resume link

You generally won't need to touch any component file just to update content.

## Making the contact form actually send email

Right now `components/Signal.tsx` just simulates a send (`setSent(true)`). To make it real, pick one:

- **Formspree** (easiest): create a form at formspree.io, then POST `form` state to your endpoint URL in `handleSubmit`.
- **Resend** or **EmailJS**: similar — call their API/SDK from `handleSubmit`.
- **mailto: fallback**: replace the button with a link to `mailto:${contact.email}?subject=...&body=...`.

## Deploying

This is a standard Next.js app — deploys to Vercel with zero config:

```bash
npx vercel
```

Or connect the GitHub repo directly in the Vercel dashboard.

## Customizing the look

Color tokens and fonts are defined in `app/globals.css` (`:root` block) and `app/layout.tsx` (font imports). Currently:
- **Display font:** JetBrains Mono
- **Body font:** IBM Plex Mono
- **Accent:** amber `#ffb000`, secondary `#46d9c4` (teal)

Change the hex values in `globals.css` to reskin the whole site in one place.
