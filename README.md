# Nuxt Content Site

SEO-friendly multilingual content site built with Nuxt, TypeScript, Element Plus, Nuxt Content, and Nuxt i18n.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set `NUXT_PUBLIC_SITE_URL` to the production domain before deployment so canonical and alternate language URLs are correct.

## Commands

```bash
npm run dev
npm run typecheck
npm run build
npm run generate
```

Markdown articles live in `content/articles/{locale}/`. Each article needs `title`, `description`, `date`, `image`, `slug`, `locale`, and `tags` frontmatter.
