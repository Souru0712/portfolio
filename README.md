# Oscar DE Portfolio — Design System

A terminal-inspired, dark-mode-first design system for a data engineer's personal portfolio. Built around monospace headings, a soft sans body, and a single neon-green accent. Every screen should feel like a calm, well-lit terminal: precise, fast, slightly nerdy, never noisy.

## Brand context

**Who:** Oscar — data engineer. Transforms raw data into insights. Loves hacking, problem-solving, finding loopholes. Works closely with AI to ship faster and write tighter prompts. Goal: automate the tedium out of daily life.

**What this design system is for:**
- The personal portfolio site (5 sections — About, Projects, Skills, Resume, Contact)
- Slide decks, write-ups, and any throwaway artifact that should *look* like Oscar made it.

**Sources used to build this:**
- No codebase, Figma, or screenshots were attached. The system was generated from a vibe brief: "minimal & monospace, dark mode, neon-green accent, terminal-like interactions."
- Fonts pulled from Google Fonts (JetBrains Mono + Inter) — see Type section. If you have license-restricted fonts you'd rather use (Berkeley Mono, Commit Mono, etc.), drop them in `fonts/` and update `colors_and_type.css`.

## Index

| File | Purpose |
|---|---|
| `README.md` | This file — brand, content, and visual foundations |
| `SKILL.md` | Agent skill manifest — load this in Claude Code to design with this brand |
| `colors_and_type.css` | All design tokens: colors, type scale, spacing, radii, shadows |
| `fonts/` | Self-hosted webfonts (JetBrains Mono, Inter) |
| `assets/` | Logos, glyphs, decorative SVGs |
| `preview/` | Cards rendered in the Design System tab |
| `ui_kits/portfolio/` | The full portfolio site as an interactive prototype |

---

## Content fundamentals

**Voice:** First person, lowercase-leaning, terse. Writes like he's commenting his own code — clear, no fluff, occasional dry humor. Not chatty, not corporate.

**Casing:**
- Section headers in code-style: `// about`, `~/projects`, `$ whoami`
- UI labels in lowercase or ALL-CAPS-MONO sparingly (`STATUS`, `STACK`, `LIVE`)
- Body copy in normal sentence case — readable above all
- Never Title Case Marketing Headlines

**Pronouns:** "I" for bio/intro. "You" only in CTAs (`get in touch`, `read the docs`). Never "we" — this is one person.

**Punctuation quirks:**
- Periods optional on short labels and one-line statements
- Em dashes welcome — they read like a pause in code
- Arrows used as glyphs: `→ live demo`, `← back`, `↗ github`
- Colons for key-value pairs: `stack: python · dbt · airflow`

**Vibe words:** precise, calm, fast, low-ceremony, slightly hackerly, automation-pilled, AI-curious.

**Specific examples:**
- Hero: `hi, i'm oscar — i turn messy data into things you can act on.`
- Project blurb: `pipeline that ingests 40M rows/day. dbt models, airflow orchestration, ~$12/month to run.`
- Contact CTA: `→ say hi` (not `Contact Me Today!`)
- Empty state: `// nothing here yet`
- Loading: `> fetching...`

**Emoji:** Avoid. If you need a glyph, use unicode (`→ ← ↗ • · ▸ ◆ ▮`) or ASCII. Emoji break the terminal illusion.

---

## Visual foundations

### Color
- **Background:** near-black (`#0a0a0a`), not pure black — gives shadows and gradients somewhere to live.
- **Surface:** `#111111` for cards, `#161616` for elevated surfaces. Differences are subtle (~6%) — the dark mode is meant to feel deep, not stripey.
- **Foreground:** off-white (`#e8e8e8`) for primary text, never `#fff` — softer on the eyes against deep black.
- **Accent:** neon green `#00ff88` (terminal-prompt green). Used SPARINGLY — accent color, focus ring, prompts (`$`), one-or-two-word callouts. If 30%+ of the screen is green, you've gone wrong.
- **Borders:** `#262626` — barely visible, just enough to define cards.
- **Semantic:** red `#ff5577` for errors/destructive, amber `#ffb84d` for warnings. No green for success — green is reserved for accent so it doesn't lose meaning.

### Typography
- **Mono:** JetBrains Mono — headings, labels, code, numbers. Weight 400/500/700.
- **Sans:** Inter — body copy, paragraphs longer than ~12 words.
- **Type scale:** modest — 12, 13, 14, 16, 18, 22, 28, 36, 48px. Display headlines top out at 48px; this isn't a marketing site.
- **Line height:** tight on mono (1.3), comfortable on sans (1.6).
- **Tracking:** `-0.01em` on display mono for that monospace-display feel; `0.08em` ALL CAPS labels.

### Spacing
- Base unit: 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Generous vertical rhythm — the design breathes. Section padding 96px on desktop.

### Background & imagery
- Backgrounds are flat. No gradients on hero/sections. No noise textures.
- One exception: a subtle 1px dotted grid (`#1a1a1a` dots on `#0a0a0a`) as an optional backdrop on hero — evokes graph paper / a code editor's whitespace dots.
- Imagery: minimal. Project cards use a small monochrome glyph or an ASCII-art tile, not screenshots (unless the user provides them).
- No stock photos. No illustrations of laptops/people. If a visual is needed, it's a code snippet, a terminal output, or a data viz.

### Borders & corners
- 1px borders, color `#262626`. Occasionally `#00ff88` for focus/active.
- Corner radius: 4px on most surfaces (cards, buttons, inputs), 0px on terminal-style elements (the hero "window," code blocks). Never larger than 8px — soft pill buttons feel off-brand.

### Shadows
- Almost no shadows. The deep dark surfaces don't need them.
- Elevation is communicated by border color + slightly lighter background.
- Exception: a faint green glow on focus rings — `0 0 0 3px rgba(0,255,136,0.2)`.

### Animation
- Easing: `cubic-bezier(0.2, 0, 0, 1)` (sharp out). No bouncy springs.
- Duration: 120–180ms for most transitions. 60ms for hover state changes.
- Signature motion: typewriter / cursor blink on hero text. `▮` cursor blinking at 1Hz.
- Project cards: nothing fancy on hover — border shifts to `#00ff88`, no lift, no scale.

### Hover & press
- **Hover:** border color shifts to accent, or text underlines (1px, accent color, 2px offset). No opacity changes.
- **Press:** no scale-down. Background gets 1 shade lighter for ~80ms then resets.
- **Focus:** 2px outline in accent green, 2px offset. Always visible — keyboard users matter.

### Transparency & blur
- Used rarely. Sticky nav has `backdrop-filter: blur(12px)` over `rgba(10,10,10,0.7)`.
- No glassmorphism cards. No frosted modals.

### Layout rules
- Max content width: 1100px. Body padding: 24px mobile, 48px desktop.
- Sticky top nav, ~56px tall.
- Single-column on mobile, 2–3 column grid for projects on desktop.
- Code-style section anchors visible in a left rail on desktop (`01`, `02`, `03`...).

### Cards
- Background `#111`, 1px border `#262626`, 4px radius. No shadow.
- Padding 24px. Hover: border `#00ff88`. Title in mono, body in sans.

---

## Iconography

**Approach:** sparse, monochrome, line-based. Icons should look like they belong in a terminal — single-color strokes, never filled illustrations.

**Set used:** [Lucide](https://lucide.dev) via CDN — clean 1.5px stroke icons, MIT licensed. Loaded as needed:
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

**When NOT to use icons:** never replace a clear text label with an icon alone. Always pair (`↗ github` not just `↗`). Exception: nav glyphs and status indicators.

**Custom glyphs:** A few are inlined as SVGs in `assets/` — the prompt cursor `▮`, a small Oscar wordmark, and an ASCII-style `</>` favicon.

**Unicode glyphs in active use:**
- `→ ← ↑ ↓` directional
- `↗` external link
- `▸ ▾` disclosure
- `▮` cursor / active indicator
- `·` separator (in metadata rows)
- `◆ ◇` filled/empty markers
- `$` prompt prefix
- `//` comment prefix (in headings)

**Emoji:** none. Period.

---

## Caveats / known gaps

- No real fonts attached → using JetBrains Mono + Inter from Google Fonts. Swap to your preferred mono (Berkeley Mono, Commit Mono, Geist Mono) by replacing files in `fonts/`.
- No real project content, screenshots, or resume PDF — UI kit uses representative placeholder copy that matches Oscar's voice.
- No logo provided — built a simple `oscar.de` wordmark + `</>` glyph. Replace freely.
