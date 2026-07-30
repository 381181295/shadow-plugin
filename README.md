![Smooth Shadow Plugin](https://shadow.floriankiem.com/images/hero.webp)

# Smooth Shadow Plugin

A simple Tailwind plugin that makes your shadows finally look good.

**[shadow.floriankiem.com](https://shadow.floriankiem.com)** — try every size, ring and color in the browser and copy the class.

## Install

```bash
npm i shadow-plugin
```

## Usage

### Tailwind stylesheet

```css
@import "shadow-plugin";
```

### Element classes

```html
<div class="smooth-shadow-md" />
```

The plugin supports Tailwind's shadow color utilities:

```html
<div class="smooth-shadow-md shadow-blue-500/50" />
```

### Shadow + ring

For elevated surfaces (dialogs, popovers, cards, menus), use `smooth-shadow-ring-{size}`, the same stacked shadow with a 1px hairline ring baked in as the final layer, so the edge morphs into the shadow instead of sitting next to it as a separate `border`. Don't add a `border`/`ring` on top; the ring is already in there.

```html
<div class="smooth-shadow-ring-md" />
```

The ring and the shadow are colored independently. `shadow-{color}` tints the shadow, `smooth-ring-{color}` tints the ring, and they compose freely:

```html
<div class="smooth-shadow-ring-md smooth-ring-black/10" />
<div class="smooth-shadow-ring-md smooth-ring-blue-500/40 shadow-blue-500" />
```

The ring defaults to `rgba(0, 0, 0, 0.05)` and flips to `rgba(255, 255, 255, 0.2)` in dark mode. That happens automatically under `prefers-color-scheme: dark`, a `.dark` class, or `data-theme="dark"` — no setup either way.

The dark alpha is deliberately much higher than the light one. The ring is an outer layer, so it paints on the page *behind* the surface and takes its rendered colour from the page background rather than from the surface it outlines. In light mode that is forgiving, because a black hairline darkens away from any near-white surface. In dark mode a white hairline lightens *toward* a raised surface, so too low an alpha lands the ring on the surface's own colour and the edge vanishes.

If your surface is light enough to sit near the ring anyway (`neutral-700` and up on a dark page), set it explicitly:

```css
:root {
  --smooth-ring-color: rgba(255, 255, 255, 0.28);
}
```

### Optional: Replace all your default shadows

```css
@theme {
  --shadow-xs: var(--smooth-shadow-xs);
  --shadow-sm: var(--smooth-shadow-sm);
  --shadow-md: var(--smooth-shadow-md);
  --shadow-lg: var(--smooth-shadow-lg);
  --shadow-xl: var(--smooth-shadow-xl);
  --shadow-2xl: var(--smooth-shadow-2xl);
}
```

## Available classes

| Class                                              | Size                                                                   |
| -------------------------------------------------- | ---------------------------------------------------------------------- |
| `smooth-shadow-xs`                                 | Extra small                                                            |
| `smooth-shadow-sm`                                 | Small                                                                  |
| `smooth-shadow` / `smooth-shadow-md`               | Medium (default)                                                       |
| `smooth-shadow-lg`                                 | Large                                                                  |
| `smooth-shadow-xl`                                 | Extra large                                                            |
| `smooth-shadow-2xl`                                | 2x large                                                               |
| `smooth-shadow-none`                               | None                                                                   |
| `smooth-shadow-ring-xs` … `smooth-shadow-ring-2xl` | Shadow + 1px hairline ring (`smooth-shadow-ring` = medium)             |
| `smooth-ring-{color}`                              | Ring color override, supports opacity (e.g. `smooth-ring-blue-500/40`) |

## Agent skills

To stop AI tools from pairing a `border` with a `shadow` (the double edge) and reach for `smooth-shadow-ring` instead:

- Claude / agent skill: [`.claude/skills/smooth-shadow-ring/SKILL.md`](.claude/skills/smooth-shadow-ring/SKILL.md)
- Cursor Bugbot rule: [`BUGBOT.md`](BUGBOT.md)

## License

MIT

Created by [Nils Eller](https://x.com/nilseller), [Eduard Wieandt](https://x.com/eduardwieandt), and [Florian Kiem](https://x.com/flornkm), in collaboration with [Rogo](https://rogo.ai/).
