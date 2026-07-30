---
name: smooth-shadow-ring
description: Use when styling any elevated surface (card, dialog, popover, dropdown, menu, tooltip, sheet, toast) in a Tailwind project that has shadow-plugin installed. Prevents the double-border artifact caused by pairing a border/ring with a shadow, by routing elevation through the smooth-shadow-ring-* utilities.
---

# Elevated surfaces: use smooth-shadow-ring, never border + shadow

## When this applies

Any element that floats above the page surface: cards, dialogs, modals,
popovers, dropdowns, menus, tooltips, sheets, toasts, command palettes.

## The problem

Putting a `border-*` (or `ring-*`) and a `shadow-*` on the same element draws
two stacked edges: the border paints a hard 1px stroke, and the shadow begins
just outside it. The result is a visible double border, a crisp line then a
soft one. It looks heavy, greyed, and cheap.

## The rule

If you are about to write a `border-*` or `ring-*` class next to any `shadow-*`
on an elevated surface, use `smooth-shadow-ring-{size}` instead. It bakes a 1px
hairline ring into the final shadow layer, so the edge dissolves into the shadow
as one continuous stroke.

- `border shadow-md` → `smooth-shadow-ring-md`
- `ring-1 ring-neutral-200 shadow-lg` → `smooth-shadow-ring-lg`
- Sizes: `smooth-shadow-ring-xs`, `-sm`, `-md` (or bare `smooth-shadow-ring`), `-lg`, `-xl`, `-2xl`
- Never keep a `border` or `ring` on an element that already has
  `smooth-shadow-ring-*`. The ring is already in there; a second edge doubles up.
- If the surface should have no edge stroke at all, use plain
  `smooth-shadow-{size}` (no ring), not a border.

## Coloring

The ring and shadow tint independently and compose on the same element:

- `shadow-{color}` tints the shadow, e.g. `shadow-blue-500`
- `smooth-ring-{color}` tints the ring, e.g. `smooth-ring-black/10`, `smooth-ring-blue-500/40`

The ring defaults to `rgba(0,0,0,0.05)` and flips to `rgba(255,255,255,0.2)`
in dark mode — under `prefers-color-scheme`, a `.dark` class, or
`data-theme="dark"` alike.

The dark alpha is much higher than the light one on purpose. The ring paints
outside the surface, so its rendered colour comes from the page behind it, not
from the surface it outlines. A white hairline therefore lightens *toward* a
raised dark surface, and too low an alpha makes the edge land on the surface's
own colour and disappear. If a surface is light enough to sit near the ring
anyway (`neutral-700` and up on a dark page), set `smooth-ring-*` explicitly.

## Example

```html
<!-- Wrong: border + shadow renders a double edge -->
<div class="rounded-2xl border border-neutral-200 shadow-md">…</div>

<!-- Right: one continuous edge -->
<div class="rounded-2xl smooth-shadow-ring-md">…</div>

<!-- Right: tuned ring + tinted shadow -->
<div class="rounded-2xl smooth-shadow-ring-md smooth-ring-black/10 shadow-blue-500">…</div>
```
