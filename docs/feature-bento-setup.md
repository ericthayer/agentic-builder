# FeatureBento — integration guide

## 1. Check the project

Run these in the project root. All four must pass before copying the component.

| Check | Command | Pass condition |
|---|---|---|
| shadcn structure | `cat components.json` | File exists, has `aliases.ui` |
| TypeScript | `cat tsconfig.json` | Exists, `compilerOptions.paths` maps `@/*` |
| Tailwind **v4** | `npm ls tailwindcss` | Version 4.x |
| Tailwind entry | grep the CSS file named in `components.json → tailwind.css` | Contains `@import "tailwindcss";` |

**Tailwind v4 is a hard requirement, not a preference.** The component uses `bg-linear-to-br` / `bg-linear-to-t` / `bg-linear-to-r`. Those are v4 utilities; v3 names them `bg-gradient-to-*`. On v3 every gradient silently renders as a flat background.

## 2. If something is missing

### No project yet — Next.js (recommended)

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app
cd my-app
npx shadcn@latest init
```

`create-next-app` ships TypeScript, Tailwind v4 and the `@/*` path alias. `shadcn init` writes `components.json`, `lib/utils.ts` (`cn`), and the theme tokens (`--background`, `--card`, `--border`, `--muted-foreground`…) the component reads through `bg-background`, `bg-card`, `border-border`, `text-muted-foreground`.

### Existing Vite + React project

```bash
npm create vite@latest my-app -- --template react-ts   # skip if the app exists
npm i tailwindcss @tailwindcss/vite
npm i -D @types/node
```

`vite.config.ts`:

```ts
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

`src/index.css`: replace contents with `@import "tailwindcss";`

`tsconfig.json` **and** `tsconfig.app.json`, under `compilerOptions`:

```json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }
```

Then:

```bash
npx shadcn@latest init
```

### Project on Tailwind v3

Upgrade before adding this component — `npx @tailwindcss/upgrade` handles most of the migration (config to CSS `@theme`, renamed utilities). Budget a review pass: it rewrites class names across the codebase, so ship it as its own PR, not bundled with this component.

### Project on JavaScript

Add `typescript`, `@types/react`, `@types/react-dom`, create `tsconfig.json` with `"jsx": "react-jsx"` and the `@/*` path, and rename touched files to `.tsx`. Then re-run `npx shadcn@latest init` so `components.json` records `"tsx": true`.

## 3. Find the default paths

Read them from `components.json`; don't assume:

```json
{
  "tailwind": { "css": "app/globals.css" },
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "utils": "@/lib/utils"
  }
}
```

| What | Next.js default | Vite default |
|---|---|---|
| Components | `components/` → `components/ui/` | `src/components/` → `src/components/ui/` |
| Styles | `app/globals.css` | `src/index.css` |

### If `ui` does not resolve to `components/ui`

Create `components/ui/` (or `src/components/ui/` on Vite) and set `"ui": "@/components/ui"` in `components.json`. Why it matters:

1. **The import path is a contract.** `demo.tsx` imports `@/components/ui/feature-bento`. A different folder breaks the import and every copy-pasted shadcn/21st.dev example after it.
2. **The CLI writes there.** `npx shadcn add button` uses the `ui` alias. If your hand-added components live elsewhere, you end up with two primitive folders and duplicate `Button`s.
3. **Ownership boundary.** `ui/` holds vendored primitives you own but rarely edit. Product compositions (`pricing-section.tsx`, `dashboard-header.tsx`) live one level up in `components/`. Keeping that line makes upgrades a diff against upstream instead of an archaeology project.

## 4. Install

```bash
npm i lucide-react
```

Copy `components/ui/feature-bento.tsx` into your `ui` folder.

Place `demo.tsx` where your router will render it:
- Next.js App Router: `app/demo/page.tsx`
- Vite: import `Demo` into `src/App.tsx`

## 5. Wire the font

`font-manrope` is not a built-in utility. Without this step the section falls back to the default sans with no error.

**Next.js** — `app/layout.tsx`:

```tsx
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
```

Global CSS:

```css
@theme inline {
  --font-manrope: var(--font-manrope);
}
```

**Vite** — self-host the font (or use `@fontsource-variable/manrope`), then in `src/index.css`:

```css
@import "@fontsource-variable/manrope";

@theme {
  --font-manrope: "Manrope Variable", ui-sans-serif, system-ui, sans-serif;
}
```

## 6. Remote image

The hero background loads from `cdn.21st.dev`. It's a CSS background, so `next.config` image domains don't apply, but a Content-Security-Policy `img-src` will block it. Self-host it under `public/` before production; a third-party CDN for hero art is an availability and privacy dependency you don't control.
