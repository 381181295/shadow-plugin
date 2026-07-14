# Shadow Agent Instructions

## Dev environment tips

- Run `npm install shadow-plugin` (or your preferred package manager) to add the package to your workspace so Vite, ESLint, and TypeScript can see it
- In the CSS file, which includes `@import "tailwindcss";`, add the following line: `@import "shadow-plugin";`

## CSS (tailwind) class instructions

- Use `smooth-shadow`, or the size variants `smooth-shadow-xs` up to `smooth-shadow-2xl`
- Color the shadow with tokens like `shadow-red-500`
- For elevated surfaces (dialogs, popovers, cards, menus) use `smooth-shadow-ring` or the size variants `smooth-shadow-ring-xs` up to `smooth-shadow-ring-2xl` — the shadow with a 1px hairline ring baked in; never add a `border`/`ring` to the same element
- Color the ring independently from the shadow with `smooth-ring-{color}`, e.g. `smooth-ring-black/10`
