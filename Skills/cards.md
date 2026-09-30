# Card System

## Purpose

This file defines the reusable card/container grammar for the mobile witch-themed to-do app.

It defines how cards behave as surfaces without prescribing the content or information architecture of any specific screen.

Use it with `Colors.md`, `typography.md`, `spacing.md`, `radius.md`, `layout.md`, `icons.md`, `visual-language.md`, `interface-craft.md`, and relevant component files.

Before defining or implementing a card value or treatment, check the existing project skill files. If an applicable rule already exists, use it automatically. If a required rule is missing, ask the user to define it or explicitly authorize derivation.

## Foundational Card Categories

The card system has three foundational categories:

1. Standard Card
2. Interactive Card
3. Feature / Special Card

Do not create global card categories such as task card, reminder card, progress card, quote card, or stats card here. Product-specific cards should inherit the appropriate foundation and define only their additional requirements in their own component specification.

A card is not required simply because several pieces of content appear together. If spacing and section hierarchy are sufficient, do not introduce a container.

## Standard Card

The Standard Card is the general-purpose content surface.

### Structure
- Surface: `#FFFBFF`
- Structural radius: 16px
- Internal padding: 16px
- General internal item spacing: 12px
- Dimensions: content-driven
- Width follows `layout.md`; it is not automatically full-width

### Visual treatment
- Level 2 Characterful Organic, on the restrained end of that level
- Subtle paper-cut silhouette
- Subtle handmade/paper texture
- Very subtle paper-like depth
- No border by default
- No automatic ornament or illustration

Exact shadow/elevation values are not defined here and belong in `elevation.md`.

Although Standard Cards and some buttons can both use Level 2 organic treatment, Standard Cards should generally feel calmer because they are content surfaces rather than actions.

Repeated cards should feel like members of one deliberately designed family. Do not randomly distort each card at runtime.

## Interactive Card

An Interactive Card is a Standard Card with meaningful whole-card interaction.

It does not become a separate visual card style and should not resemble an oversized Primary Button.

### Base
Inherits the complete Standard Card treatment.

The whole card may be tappable when the card represents one coherent destination or action.

### Pressed
- Provides subtle tactile feedback
- Structural radius remains 16px
- Approved paper-cut silhouette does not morph
- Exact motion values belong in `motion.md`

### Focused
A visible focus treatment is required where applicable.

Exact focus-ring geometry is not defined here. Do not invent it.

### Disabled
A disabled state exists only when the specific interactive card genuinely requires one.

Do not automatically create disabled variants of every card.

### Internal actions
If a card contains independent controls such as checkboxes, menus, edit controls, or other actions:
- those controls retain their own interaction targets
- do not automatically make the whole card tappable when that would make interaction ambiguous
- decorative treatment must not be the only cue that the card is interactive

## Feature / Special Card

Feature / Special Cards are intentionally more expressive storytelling surfaces.

### Structure
- Structural radius: 16px by default
- Base padding: 16px
- Content-driven dimensions
- Level 3 Expressive Organic treatment

### Visual freedom
A Feature Card may selectively use:
- stronger paper-cut asymmetry
- more expressive paper texture
- layered paper pieces
- illustration overlapping the visible edge
- corner ornaments
- selective floating ornaments
- approved magical/storybook motifs
- richer illustrated colors under the illustration-color exception

These are possibilities, not a checklist.

Do not maximize texture, illustration, ornament, layering, and irregularity simultaneously. One main expressive treatment should lead the composition.

### Surface color
There is no universal Feature Card background.

Use an existing approved surface when appropriate, such as:
- `#FFFBFF`
- `#EEDCFA`

If a Feature Card requires a surface color not already approved for the intended use, ask rather than inventing one.

Illustration colors do not automatically become UI surface tokens.

## Nested Cards & Internal Containers

Avoid card-inside-card structures unless the content hierarchy genuinely requires them.

### Nesting rules
- The outer surface carries most of the paper-cut character.
- Inner containers become progressively cleaner and less irregular.
- Inner surfaces do not automatically receive another shadow, border, texture, or ornament.
- Nested corners should appear visually concentric with their parent container.
- Do not calculate inner radii with an arbitrary formula such as `outer radius - 4px`.
- Do not introduce new radius tokens for nesting.

### Internal grouping
Before adding another surface, prefer:
1. spacing
2. typography
3. divider, when appropriate
4. inner surface only when genuinely necessary

An inner surface may use an existing approved surface when context requires it, but do not automatically apply `#EEDCFA` merely because content is nested.

## Borders & Dividers

### Card borders
Cards have no border by default.

A border may be introduced when clearer separation from the surrounding surface is genuinely required.

Approved options:
- Default border: `#D8C5E3`
- Subtle border: `#E8D9F0`

Adding a border does not automatically mean adding a shadow.

Decorative edge treatments on Feature Cards are artwork, not functional borders.

### Dividers
- Divider color: `#E2D2EA`
- Use only when spacing alone does not communicate grouping clearly enough
- Do not automatically place a divider between every repeated item
- Dividers should not run through illustrations or decorative ornaments

General hierarchy:

**Spacing first → divider when needed → inner surface only when genuinely necessary.**

## Card Content Structure

Cards do not have mandatory header/body/footer slots.

A card may contain any appropriate combination of:
- heading/title
- supporting text
- metadata
- icon
- illustration
- primary content
- status information
- actions

None of these are globally required.

### Composition rules
- Content follows the approved typography hierarchy.
- General internal spacing is 12px unless a more specific existing relationship applies.
- Specific relationships override general card spacing. For example, title → secondary information uses the already-approved 4px relationship.
- Actions remain clearly associated with the content they affect.
- Cards do not automatically need headers or footers.
- Cards do not automatically need icons or illustrations.
- Empty space is allowed.
- Feature Cards may use asymmetric composition when readability and interaction remain clear.
- Standard and repeated cards prioritize predictable scanning over decorative composition.
- Content growth increases card height rather than forcing content into arbitrary fixed dimensions.

Product-specific components may define their own internal composition while inheriting this card foundation.

## Card States

Cards do not receive every possible state globally.

### Standard Card
Default only unless the product component using it requires additional semantic behavior.

### Interactive Card
May support:
- Default
- Pressed
- Focused
- Disabled, only when genuinely required

### Feature / Special Card
Has no universal interaction-state system.

If a Feature Card is interactive, it inherits Interactive Card behavior rather than creating a separate interaction model.

### Semantic states
Selected, completed, overdue, error, success, warning, information, and similar states are defined by the product component that requires them.

`cards.md` does not establish rules such as:
- every selected card becomes purple
- every completed card becomes green
- every warning card becomes yellow

Use the applicable semantic/component specification instead.

Across state changes:
- Structural radius remains 16px.
- Approved paper-cut silhouette does not morph.
- Important state is not communicated through texture or ornament alone.
- Exact transition animation belongs in `motion.md`.

## Decoration & Restraint

Standard and repeated cards remain visually calmer than one-off storytelling surfaces.

Do not automatically add:
- stars
- sparkles
- moons
- herbs
- crystals
- potion bottles
- decorative borders
- illustration overlaps

to ordinary cards.

Decorative motifs should be introduced only when the relevant component or composition explicitly calls for them.

Feature Cards may use stronger visual storytelling while still following the restraint rules in `visual-language.md`.

## Accessibility

Cards inherit accessibility requirements from `interface-craft.md`.

In particular:
- an interactive card must expose appropriate semantics
- independent controls inside a card must remain independently operable
- whole-card interaction must not create ambiguous nested targets
- focus must be visible where applicable
- state must not rely on decorative treatment alone
- decorative illustrations should not create false affordances
- touch targets must remain adequate

## Undefined Card Protocol

If a card requires a value, state, surface, silhouette, elevation, interaction, nested treatment, ornament, width behavior, or other rule that is not defined:

1. Check `cards.md` and all relevant project skill files.
2. If an applicable rule already exists, use it automatically.
3. If no rule exists, identify the exact missing decision.
4. Do not invent a framework default, arbitrary token, new card category, random paper silhouette, or decorative treatment.
5. Ask the user to define the missing rule or explicitly authorize derivation.
6. If derivation is authorized, derive only the requested decision/group.
7. Do not generalize a screen-specific or one-off card treatment into a global rule without user approval.
