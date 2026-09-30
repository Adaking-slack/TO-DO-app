# Layout System

## Purpose

This file defines the mobile product's spatial structure and layout behavior.

It deliberately does **not** define the information architecture or required content of individual screens. Screen composition is decided while designing the relevant experience.

Before introducing a layout value or behavior, check the existing project skill files. Reuse applicable rules automatically. If a required rule does not exist, ask the user to define it or explicitly authorize derivation.

## Source-of-Truth Relationships

Use alongside:
- `spacing.md` for spacing values and relationships
- `radius.md` for structural geometry and organic shape hierarchy
- `visual-language.md` for paper-cut, decoration, texture, and illustration behavior
- `interface-craft.md` for interface quality and accessibility rules
- `typography.md` for text hierarchy and alignment

This file must not override those systems.

## Existing Screen Spacing

The following approved values come from `spacing.md`:

- Horizontal screen padding: 16px
- Top content padding: 16px
- Bottom content padding: 24px
- Major screen sections: 32px
- Section heading to content: 12px
- Related content groups: 16px
- Native OS safe-area insets must be respected.
- Keyboard-open layouts accommodate the keyboard dynamically.
- Scrollable content requires at least 24px visual separation from a fixed bottom action, plus enough space to prevent obstruction.

## Core Layout Principle

Use one primary vertical flow per screen.

The interface should not default to a dashboard made from unrelated boxes. Content should read naturally from top to bottom.

- Primary screen content scrolls vertically when it exceeds the viewport.
- Horizontal scrolling is not used for core task content.
- Cards live inside the content flow rather than defining a screen grid.
- Fixed elements are reserved for components that genuinely require persistent access.
- Decorative elements may visually escape the content column but cannot increase functional screen width or create horizontal scrolling.

## Define Structure, Not Screen Content

`layout.md` defines spatial structure and behavior, not page composition.

Do not prescribe that a particular screen must contain:
- a greeting
- profile image
- notebook
- summary
- task list
- illustration
- quote
- CTA
- or any other content element

Screens may evolve while being designed.

Reusable structural concepts may include:

**Screen → Section → Content group → Component**

A screen's first region may eventually contain any appropriate content. Subsequent regions are equally content-dependent.

Do not infer screen information architecture from layout examples.

## Section Model

Sections are content-led, not container-led.

- A section does not automatically need a card, border, background, or paper-cut container.
- Screens may contain as many or as few sections as the experience requires.
- Sections stack vertically in the primary content flow.
- Distinct sections use the approved 32px separation.
- Section headings are optional.
- When a section heading exists, use the approved 12px heading-to-content spacing.
- Related content may form groups using approved spacing relationships.
- Sections may contain lists, cards, text, illustrations, interactive areas, or future components.
- Expressive paper containers are optional and require a visual or functional purpose.
- Sections do not need equal height or equal visual weight.
- Intentional empty space is allowed.
- Decorative elements may visually cross section boundaries without moving the underlying functional layout.

## Content Width & Alignment

The default functional content region occupies the available width inside the approved 16px horizontal screen padding.

- Content is left-aligned by default, consistent with `typography.md`.
- Components do not automatically need to fill the available width.
- Component width follows the relevant component specification or content need.
- Major sections do not need identical widths when an explicitly designed composition calls for variation.
- Expressive elements may be narrower, offset, or asymmetrical when explicitly designed.
- Decorative paper-cut elements may visually extend outside the functional content region without creating horizontal scrolling.
- Illustrations may be centered, offset, or edge-breaking only when their relevant design explicitly defines that composition.
- There is no global centered column, fixed mobile max-width, or percentage-width rule.
- Do not invent arbitrary offsets. Define them when designing the relevant composition.

## Scrolling & Fixed Elements

### Scroll by default

The following normally participate in the screen's vertical scroll:
- screen content
- sections
- section headings
- illustrations
- cards
- task lists
- free-writing/notebook-style content if introduced

### Fixed only when required

Components that may be fixed when their specification requires persistence include:
- navigation
- persistent primary actions
- bottom action areas
- modal overlays and bottom sheets

This file does not require any particular screen to contain a fixed element.

### Sticky behavior

Nothing becomes sticky merely for convenience.

Sticky behavior for headings, filters, dates, selectors, or other elements must be explicitly defined for the relevant screen or component.

When fixed UI exists:
- Scrollable content cannot be obscured underneath it.
- Maintain the approved minimum 24px visual separation from fixed bottom actions.
- Respect native safe-area insets.
- Do not unnecessarily reduce usable content space.
- Decorative elements cannot become independently fixed, parallax, or floating simply for magical effect. Such behavior requires explicit definition in the relevant system, including `motion.md` where applicable.

## Bottom Sheets

Approved spacing and radius values are inherited from existing project skills:

- Horizontal padding: 24px
- Top padding: 32px
- Bottom padding: 24px
- Between sheet sections: 32px
- Content to action area: 24px
- Stacked actions: 12px
- Inline actions: 8px
- Structural radius: 32px on top corners only

Layout behavior:
- Bottom sheets enter from and remain anchored to the bottom.
- Height is content/context dependent; no universal percentage or preset height is defined.
- Sheets may become near-full-height when required.
- If content exceeds available sheet height, sheet content scrolls while the underlying page remains spatially behind it.
- When the sheet is modal, the underlying page is not interactable.
- Drag handles are optional and depend on the eventual sheet interaction.
- Large intentional empty space is permitted and must not be misinterpreted as padding.

Exact dismissal behavior is undefined until specified for the relevant interaction.

## Modals

- Modal/dialog padding: 24px.
- Use modals for genuinely focused or interruption-level experiences rather than ordinary content by default.
- Position modals within the usable viewport and respect safe areas.
- Dimensions remain content/context dependent.
- Do not cram or shrink complex experiences into a modal merely to preserve the pattern. Choose an appropriate screen or sheet pattern when designing the flow.
- Exact dismissal behavior is not globally defined.

## Layering & Overlap

### Functional content

- Functional content remains in normal layout flow.
- Functional components cannot overlap other functional components unless the relationship is explicitly designed.
- Overlap cannot compensate for incorrect spacing.

### Decorative content

Decorative elements may:
- overlap cards, sections, and container boundaries
- extend visually toward screen edges

They must not:
- create horizontal scrolling
- obscure text
- obscure controls or state information
- interfere with touch targets
- alter functional spacing between components

### Intentional component overlap

Functional or semi-functional component overlap is allowed only when explicitly designed and documented.

The storybook visual language is not permission to infer overlap.

**Layout establishes structure. Visual language may break the visual boundary, not the structural one.**

## Mobile Adaptation

The product is mobile-only and uses fluid mobile layout rather than device-specific compositions.

- Adapt to available viewport width and height.
- Maintain the default 16px horizontal screen padding across phone sizes unless a future explicitly approved rule overrides it.
- Components intended to fill the content region expand or contract with available width.
- Text wraps naturally instead of shrinking to preserve a mockup composition.
- Do not introduce fixed heights simply to reproduce a static design.
- Content growth should normally increase component height rather than clip content.
- Safe areas come from the operating system.
- Larger phones may naturally reveal more content; do not add decoration simply to fill space.
- Smaller phones may reveal less before scrolling; do not compress the approved spacing system simply to fit more.
- Paper-cut silhouettes and decorative overlaps must remain usable at different mobile widths.
- If a component requires width-specific behavior, define that behavior in its component skill rather than inventing a global breakpoint here.

## Content Ordering & Hierarchy

Layout expresses content hierarchy after the content hierarchy has been determined during screen design.

- Important content for the current experience should generally appear earlier in the vertical flow unless the specific experience requires otherwise.
- Decorative intensity or visual size must not cause secondary information to compete with primary content.
- Related elements stay together as content groups.
- Do not group unrelated concepts merely because they fit inside one paper container.
- Large illustrations or expressive surfaces must not bury the screen's functional purpose.
- Actions should appear near the content they affect when appropriate.
- Repeated content should establish a predictable scanning rhythm.
- This system does not prescribe which content is primary or secondary on any specific screen.
- Do not create empty sections merely to satisfy a layout template.

**Understand the content hierarchy first, then express that hierarchy spatially.**

## Undefined Layout Protocol

When a required layout decision is missing:

1. Check all relevant project skill/rule files first.
2. If an applicable rule already exists, use it automatically.
3. If no rule exists, identify the exact missing layout decision.
4. Do not choose the nearest spacing token, framework default, common mobile pattern, or visually similar screen as a substitute.
5. Ask the user to define the missing rule or explicitly authorize derivation.
6. If derivation is authorized, derive only the requested decision/group.
7. Do not generalize a screen-specific decision into a global layout rule unless the user approves that generalization.

Examples and mockups in project discussions are not automatically layout requirements.
