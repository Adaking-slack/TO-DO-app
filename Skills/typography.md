# Typography Design System

## Purpose

This file defines the approved typography system for the witch-themed to-do application.

These specifications are authoritative. Do not invent, infer, interpolate, or introduce typography values that are not explicitly defined in this file.

## Font Family

The application uses one font family throughout:

- Primary / UI: `Lora`
- Display: `Lora`
- Reading / long-form: `Lora`
- Numbers, dates, times, and task counts: `Lora`

Do not introduce a secondary typeface without explicit user approval.

## Allowed Font Weights

Only the following Lora weights are approved:

- Regular: `400`
- Medium: `500`
- Semibold: `600`
- Bold: `700`

`700` is reserved for emphasis. It is not a default heading or UI weight.

## Core Type Scale

| Style | Size | Weight | Line Height | Letter Spacing |
|---|---:|---:|---:|---:|
| H1 | `32px` | `600` Semibold | `120%` | `0` |
| H2 | `24px` | `600` Semibold | `120%` | `0` |
| H3 | `19px` | `600` Semibold | `120%` | `0` |
| Body Regular | `15px` | `400` Regular | `150%` | `0` |
| Body Medium | `15px` | `500` Medium | `150%` | `0` |
| Small Regular | `12px` | `400` Regular | `150%` | `0` |
| Small Medium | `12px` | `500` Medium | `150%` | `0` |

There is no H4, H5, H6, or separate Display size. Do not create one unless the user explicitly defines it.

## Component Typography

| Element | Approved style |
|---|---|
| Button text | Body Medium — `15px / 500` |
| Input text | Body Regular — `15px / 400` |
| Input placeholder | Body Regular — `15px / 400` |
| Navigation / tab text | Small Regular — `12px / 400` |
| Labels | Small Regular — `12px / 400` |
| Links | Body Medium — `15px / 500` |
| Task title | H3 — `19px / 600` |
| Task metadata | Small Regular — `12px / 400` |
| Long-form / reading text | Body Regular — `15px / 400` |

All styles retain the line height and letter spacing assigned to their corresponding core type style.

## Alignment

- Headings: left aligned.
- Body text: left aligned.

Do not introduce a different default alignment. Context-specific exceptions require an explicit design requirement or user approval.

## Text Casing

- Buttons: Sentence case.
- Navigation / tabs: Sentence case.
- Labels: UPPERCASE.
- Task titles: Sentence case.
- General ALL CAPS usage outside the label rule: undefined.

Do not interpret the label rule as permission to use ALL CAPS elsewhere.

## Text Decoration and Styling

- Italic: allowed.
- Links: underlined by default.
- Underline outside links: not allowed.
- Completed task text: strikethrough.
- Bold `700`: reserved for emphasis.

Italic being allowed does not mean it should be applied by default. It may only be used when the content or design context specifically calls for emphasis or an italic treatment.

## Truncation and Wrapping

Text truncation behavior is context-dependent.

There is no global rule requiring either wrapping or ellipsis. Use an already-defined component rule when one exists. If a new component requires a truncation decision and no applicable rule exists, follow the Undefined Typography Protocol below.

## Reading Width

Maximum body-text width is currently undefined.

Do not invent a maximum character count, `ch` width, pixel width, or other reading-width constraint.

## Numeric Content

Use `Lora` for all numeric content, including:

- Dates
- Times
- Task counts
- Progress values
- Other numeric UI content

Use tabular numerals for changing values or values requiring column alignment,
as defined in `interface-craft.md`. Continue using Lora; no separate numeric
typeface is approved. Follow `interface-craft.md` for typography implementation
guidance while retaining this file's approved type-scale tokens.

## Undefined Typography Protocol

This rule is mandatory for any AI tool, coding agent, design agent, or implementation system using this file.

If an interface element requires a typography decision that is not explicitly defined here:

1. Do not choose a value.
2. Do not derive a new value from the existing type scale.
3. Do not use a framework default as a substitute.
4. Do not introduce a new font family, size, weight, line height, letter spacing, casing rule, alignment, decoration, truncation rule, or reading-width rule.
5. Notify the user that the required typography property is undefined.
6. Identify the exact element and typography property that requires a decision.
7. Ask the user to provide or approve the value.
8. Continue with that typography decision only after the user has supplied or explicitly authorized the value.

If the user explicitly authorizes the AI to derive a particular value, the AI may do so only for that requested decision. This does not grant permission to derive other undefined typography values.

## Currently Undefined Decisions

The following are intentionally unresolved:

- General ALL CAPS usage outside labels.
- Maximum body-text width.
- Universal truncation/wrapping behavior; this remains context-dependent.

These must remain undefined until the user makes a decision.

## System Constraint

Consistency takes precedence over novelty. Reuse an existing approved typography style whenever it satisfies the required hierarchy and function. However, reuse must not be used to conceal a genuinely new typography requirement.

When no approved style appropriately serves a new requirement, ask the user rather than expanding the system automatically.
