# MavenScout — Design Brief

## What's fixed (hard constraints)

- **Primary accent color:** cyan `#0C8C9F` — the color used in the logo's center dot and the "Scout" half of the wordmark.
- **Logo assets** (provided as SVG, use exactly as-is — don't redraw or recolor):
  - `mavenscout-mark.svg` — icon only (two corner brackets + a dot, reading like a viewfinder/scope), for compact placements
  - `mavenscout-app-icon.svg` — the mark on a white rounded-square tile
  - `mavenscout-lockup-horizontal.svg` — full wordmark lockup ("Maven" in dark ink, "Scout" in cyan) with the mark alongside it

SVG is the right format here — scales cleanly at any size, tiny file size, easy to embed inline. No PNG versions are needed for this build; PNGs would only matter later for things like a social-share preview image or a legacy `.ico` favicon fallback.

## What's open (Fable's call)

The app does **not** need to visually match mavenscout.com — that marketing site was built quickly and may be redesigned later. Beyond the cyan accent and the logo assets above, Fable has real creative latitude on:

- Typography — pick a deliberate pairing; no obligation to use Plus Jakarta Sans just because the marketing site does
- Secondary/neutral palette — background, text, border colors
- Layout patterns, spacing scale, border radius, component style (buttons, cards, inputs, modals, badges)

**One steer worth giving explicitly:** ask Fable to avoid the visual patterns AI-generated design defaults to when a brief leaves room open — a warm cream background with a serif display and a terracotta accent, a near-black background with a single neon accent, or a hairline-rule newspaper layout with zero border-radius. None of these are wrong in isolation, but they show up regardless of the actual brief, which is the opposite of what a real product identity should do. Push for choices that feel specific to *this* product — a trust-driven, professional directory of vetted human experts — rather than generically "AI-generated app."

## Optional creative direction (inspiration, not a requirement)

Given the subject matter — credibility, curation, and trust between professionals — an editorial, understated feel may suit this better than a typical SaaS-dashboard look: generous white space, confident but restrained typography, a warm-neutral (not stark-white) background, cyan reserved for actions and emphasis rather than used everywhere. This is a suggestion to hand Fable as a starting thought, not a spec to enforce.
