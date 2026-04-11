![Smooth Shadow Plugin](demo/public/images/smooth-shadow-image.webp)

# Smooth Shadow Plugin

A simple Tailwind plugin that makes your shadows finally look good.

## Install

```bash
npm i shadow-plugin
```

## Usage

### Tailwind stylesheet

```css
@import 'shadow-plugin';
```

### Element classes

```html
<div class="smooth-shadow-md" />
```

The plugin supports Tailwind's shadow color utilities:

```html
<div class="smooth-shadow-md shadow-blue-500/50" />
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

| Class | Size |
|-------|------|
| `smooth-shadow-xs` | Extra small |
| `smooth-shadow-sm` | Small |
| `smooth-shadow` / `smooth-shadow-md` | Medium (default) |
| `smooth-shadow-lg` | Large |
| `smooth-shadow-xl` | Extra large |
| `smooth-shadow-2xl` | 2x large |
| `smooth-shadow-none` | None |

## License

MIT

Created by [Nils Eller](https://x.com/nilseller), [Eduard Wieandt](https://x.com/eduardwieandt), and [Florian Kiem](https://x.com/flornkm).
