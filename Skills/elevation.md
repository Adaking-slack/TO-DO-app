# Elevation

## Purpose
Defines the currently approved elevation scale. Keep paper depth soft and restrained; do not introduce arbitrary component-specific shadows.

## Level 0 — Flat
`box-shadow: none`

Used for:
- Task Rows
- Inputs unless another approved component rule says otherwise
- Navigation items
- Ordinary flat content

## Level 1 — Subtle
`box-shadow: 0 2px 6px rgba(26, 15, 46, 0.08)`

Used for:
- Personal Note at rest
- Standard cards/surfaces when elevation is needed

## Level 2 — Raised
`box-shadow: 0 4px 12px rgba(26, 15, 46, 0.12)`

Used for:
- FAB
- Bottom Navigation
- Personal Note while editing
- Other genuinely elevated surfaces only when an applicable component specification assigns Level 2

## Rules
- No stacked shadows by default.
- No colored glow.
- Do not invent additional elevation levels without approval.
