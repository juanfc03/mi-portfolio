---
name: Mono Archive
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c9c6c5'
  secondary: '#45655a'
  on-secondary: '#ffffff'
  secondary-container: '#c7eadc'
  on-secondary-container: '#4b6b60'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#c7eadc'
  secondary-fixed-dim: '#accec1'
  on-secondary-fixed: '#002018'
  on-secondary-fixed-variant: '#2e4d43'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  caption:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Code mapping (Tailwind 4 @theme inline)

The implementation in `src/styles/global.css` uses a 5-step scale per role (`xs` / `sm` / `md` / `lg` / `xl`). The names above are design references; the table below shows the closest token currently emitted in `@theme inline`:

| Design reference | Code token (used) | Size |
| --- | --- | --- |
| `headline-lg-mobile` (24px) | `--text-headline-xs` | 24px |
| `headline-lg` (32px) | `--text-headline-md` | 32px |
| `display-lg` (48px) | `--text-display-md` | 48px |
| `body-md` (15px) | `--text-body-base-md` | 15px |
| `body-lg` (18px) | `--text-body-large-md` | 18px |
| `label-md` (12px) | `--text-label-base-md` | 12px |
| `caption` (11px) | `--text-caption-md` | 11px |
| `container-max` (1200px) | `--spacing-container-max` | 1200px |
| `gutter` (24px) | `--spacing-gutter-md` | 24px |
| `margin-desktop` (64px) | `--spacing-margin-xl` | 64px |
| `margin-mobile` (20px) | `--spacing-margin-xs` | 20px |

> `DESIGN.md` remains the **authoritative palette** (full list of colors defined in the frontmatter). The `@theme inline` block in `global.css` only emits the tokens actually used by the components — adding a new color usage is a two-step change: pick the value from `DESIGN.md`, add the `--color-*` token to `@theme inline`.

## Brand & Style

The design system is a minimalist editorial framework designed for high-end personal portfolios and digital archives. It evokes a sense of quiet authority, intellectual rigor, and precision. By treating digital space with the same reverence as a physical gallery or a premium printed journal, the UI remains unobtrusive, allowing the work and narrative to take center stage.

The visual style is **Modern Minimalism** with an **Editorial** backbone. It relies on a strict mathematical grid, expansive whitespace, and a monochromatic foundation. The aesthetic is defined by "The Absence of Decoration"—where beauty is derived from the proportions of typography and the rhythm of the layout rather than effects. 

Key attributes include:
- **Quiet Luxury:** Sophisticated and understated.
- **Architectural:** Heavy focus on structure, alignment, and clear lines.
- **Intentional:** Every element serves a functional or narrative purpose.

## Colors

The palette is rooted in a high-contrast monochromatic base, utilizing a spectrum of "Ink and Paper."

- **Backgrounds:** Pure white (#FFFFFF) for primary surfaces to maximize the "printed page" feel, with off-white (#F5F5F5) for subtle section differentiation.
- **Typography:** Deep Black (#0D0D0D) for primary text to ensure maximum legibility and weight. A mid-tone gray (#707070) is used for secondary metadata.
- **Accent:** A single, muted **Emerald Green (#2E4D43)** is used sparingly for interactive cues, active states, or signifying "new" content.
- **Dividers:** Extremely thin, light gray lines (#E0E0E0) to define the grid without cluttering the visual field.

## Typography

This design system utilizes **JetBrains Mono** exclusively to achieve a modern, technical, yet elegant editorial look. The monospaced nature of the font reinforces the "grid" feel of the system.

- **Hierarchy:** Contrast is created through size and weight rather than font switching. Large display sizes are slightly tighter in letter-spacing to feel more "graphic."
- **Readability:** Body text uses a generous 1.6x line-height to maintain a comfortable reading rhythm in long-form content.
- **Labels:** Small-scale labels and metadata should use uppercase with slight tracking (letter-spacing) to act as clear navigational anchors.

## Layout & Spacing

The layout is based on a **Fixed Grid** system that centers on larger viewports, mimicking the margins of a printed book.

- **Desktop (1200px+):** A 12-column grid with 24px gutters. Use wide 64px outer margins to create "breathing room."
- **Tablet (768px - 1199px):** 8-column grid with 40px margins.
- **Mobile (< 767px):** 4-column grid with 20px margins.

**Spacing Rhythm:**
Use a base 4px unit. Vertical spacing between sections should be significant (80px, 120px, or 160px) to clearly demarcate different narratives or projects. Elements within a group should be tightly coupled (8px, 16px).

## Elevation & Depth

This design system rejects shadows and blurs in favor of **Flat Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Levels:** Depth is indicated by color blocks (White vs. Light Gray) rather than height.
- **Borders:** Use 1px solid borders (#E0E0E0) for framing images and defining input fields. This maintains the "blueprint" aesthetic.
- **Interactivity:** Instead of a shadow, a "lift" is represented by a fill color change (e.g., a button filling from outline to solid black) or a slight offset movement.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every UI element—including buttons, image containers, cards, and input fields—must have 90-degree corners. This reinforces the grid-based, architectural nature of the editorial style. Circles may only be used for small decorative icons or status indicators, never for structural containers.

## Components

### Buttons
Primary buttons are solid black with white text, 0px radius, and no shadow. Secondary buttons are 1px black outlines. Hover states should simply invert the colors.

### Chips / Tags
Small, sharp-edged boxes with 1px gray borders. Typography should be `label-md` uppercase. Use these for categories or tech stacks.

### Input Fields
Minimalist 1px bottom-border only, or a full 1px box. Labels should be placed above the field in `label-md`. Focus state uses the primary accent color for the border.

### Cards
Cards are defined by the grid rather than a background container. Use a thin top-border to separate items in a list. Images within cards should have a subtle gray placeholder background to maintain the grid's visual weight even before images load.

### Lists
Project lists should feel like a table of contents. Use a numbering system (e.g., 01, 02) in a light gray color to the left of the item title.

### Navigation
The header should be a simple, single-line text-based navigation. No icons or complex menus. Keep the logo as a simple typographic mark in `headline-lg`.
