# Radius & Shape System

## Purpose

This file defines the approved corner-radius system and the relationship between functional geometry and the product's organic paper-cut shape language.

Implementation must also follow `visual-language.md`, `spacing.md`, and `interface-craft.md`. If a required radius or shape treatment is not defined in the project skills, do not invent one. Ask the user to define it or explicitly authorize derivation.

## Radius Scale

| Token | Value | Intended use |
|---|---:|---|
| `radius-xs` | 4px | Tiny elements and subtle rounding |
| `radius-sm` | 8px | Small functional controls |
| `radius-md` | 12px | Inputs and standard controls |
| `radius-lg` | 16px | Standard cards and larger components |
| `radius-xl` | 24px | Expressive cards and prominent surfaces |
| `radius-2xl` | 32px | Bottom sheets and highly expressive containers |
| `radius-full` | 9999px | Pills and circular controls where explicitly assigned |

No other functional radius value may be introduced without user approval.

## Approved Core Assignments

| Component | Radius |
|---|---:|
| Standard card | 16px |
| Task card / task-row container | 16px |
| Button | 12px |
| Input / search field | 12px |
| Checkbox | 4px |
| Tag / chip | 9999px |
| Modal / dialog | 24px |
| Bottom sheet | 32px on top corners only |
| Image / illustration container | 16px |
| Icon button | 12px |

These values define underlying functional geometry. Component-specific skill files may later define approved visible organic silhouettes without changing these structural radius values.

## Two-Layer Shape Model

### Functional geometry

Radius tokens define the component's structural geometry, including layout bounds, clipping behavior, alignment, and interaction area.

A component assigned `radius-lg: 16px` remains structurally a 16px-radius component.

### Visible paper-cut silhouette

The organic paper-cut treatment is a visual layer applied to the underlying geometry. It may introduce subtle handmade variation without creating new radius values.

Do not invent intermediate values such as 14px, 17px, or 21px to simulate handmade irregularity.

**Radius = structural geometry.**

**Paper cut = visual character.**

## Controlled Irregularity

The visible silhouette may use controlled organic irregularity under these rules:

- Corners remain recognizably rounded.
- Edge variation is subtle rather than jagged.
- Opposite edges do not need to be perfectly symmetrical.
- Irregularity must never alter functional spacing, alignment, or interaction bounds.
- Repeated components may show slight visual variation while retaining identical structural geometry.
- Smaller functional controls remain closer to their underlying geometry.
- Larger and more expressive surfaces may show more visible paper-cut character.
- Do not use torn, burnt, distressed, aggressively wavy, or randomly jagged edges.
- Focused, pressed, selected, disabled, loading, error, and similar interaction states retain the same structural radius and visible silhouette. Interaction states must not morph the component's shape.

## Shape Hierarchy

Everyday UI is allowed to carry distinctive organic character. Special shapes are not limited to decorative or storytelling screens.

### Level 1 — Functional Organic

Applies to highly functional or compact controls such as:

- Inputs
- Search fields
- Small buttons
- Menus
- Chips and tags

These remain closest to conventional geometry. Their handmade character should come from one or two subtle deviations rather than a strongly unusual silhouette.

### Level 2 — Characterful Organic

Applies to components such as:

- Task cards
- Standard cards
- Primary buttons
- Dialogs

The paper-cut silhouette should be clearly noticeable while remaining controlled, legible, repeatable, and easy to interact with.

### Level 3 — Expressive Organic

Applies to larger or more storytelling-oriented surfaces such as:

- Bottom sheets
- Feature cards
- Empty states
- Achievements
- Onboarding surfaces

These may use more obvious asymmetry, unusual silhouettes, and layered-paper composition while preserving usability.

### Governing principle

The more functional and repetitive a component is, the more restrained its organic shape should be. The more expressive or storytelling-oriented a component is, the more freedom its silhouette may receive.

This hierarchy does **not** authorize implementation to invent arbitrary silhouettes. Exact visible shape treatments must be defined in the relevant component skill file, such as `inputs.md`, `buttons.md`, or `cards.md`. If the shape has not been defined there or elsewhere in the project skills, ask the user before creating it.

## Nested Containers

Nested rounded containers must follow the concentric-radius principle already established in `interface-craft.md`.

Additional rules:

- The outermost expressive surface carries most of the paper-cut character.
- Inner functional surfaces become progressively cleaner.
- Do not stack equally irregular silhouettes inside one another.
- Nested radii must remain visually concentric.
- An inner surface may retain handmade texture even when its edge is cleaner.
- Organic nesting does not create additional radius tokens.

## Component State Rule

A component's radius remains unchanged across interaction states.

Pressed, focused, selected, disabled, loading, error, and similar states cannot change the structural corner radius. Shape changes are reserved for genuine structural transformations into a different component or form.

## Undefined Shape Protocol

Before creating or deriving a shape treatment:

1. Check the existing project skill and rule files.
2. If an applicable rule already exists, use it automatically.
3. If no applicable rule exists, do not infer a shape from the theme, a nearby component, a framework default, or a visually similar element.
4. Ask the user to define the missing treatment or explicitly authorize derivation.
5. If derivation is authorized, derive only the requested decision or group.
6. Do not treat a derived rule for one component as permission to extend it to unrelated components.

The witch/storybook theme is never permission to invent new geometry.
