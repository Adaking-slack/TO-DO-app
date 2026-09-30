# Button System

## Purpose

This file defines the button system for the mobile witch-themed to-do app.

Use it with `typography.md`, `spacing.md`, `Colors.md`, `radius.md`, `icons.md`, `visual-language.md`, and `interface-craft.md`.

Before creating or deriving a button value or treatment, check the existing project skill files. If an applicable rule already exists, use it automatically. If a required rule is missing, ask the user to define it or explicitly authorize derivation.

## Existing Foundations

Buttons inherit these approved rules:

- Label typography: Lora, 15px, Medium 500
- Label casing: Sentence case
- Horizontal padding: 16px
- Vertical padding: 12px
- Structural radius: 12px
- Icon-to-text spacing: 8px
- Paper-cut visual language with controlled irregularity
- Radius and visible silhouette do not morph between interaction states
- Light tactile paper texture may be used where appropriate

## Button Categories

The approved categories are:

### Primary
The strongest action in the current context.

Examples may include:
- Add task
- Save changes
- Create reminder

### Secondary
An important action with lower emphasis than Primary.

Examples may include:
- Edit details
- Choose date

### Tertiary / Text
A lightweight action that does not require a visible container by default.

Examples may include:
- Skip
- Cancel
- View all

### Destructive
An action with destructive consequences.

Examples may include:
- Delete task
- Remove list

### Icon-only
A compact action represented by a sufficiently recognizable functional icon.

The existence of these categories does not mean every screen or action group must use all of them.

Do not invent additional button categories such as ghost, tonal, soft, or outline unless explicitly approved.

## Visual Treatment

### Primary

- Filled with Primary `#8A00DA`
- Label uses Text on Primary `#FFFFFF`
- Clearly visible but controlled paper-cut silhouette
- Light tactile paper texture where appropriate
- Characterful organic treatment

### Secondary

- Uses Secondary Surface `#EEDCFA`
- Label uses Primary `#8A00DA`
- Paper-cut silhouette is subtler than Primary
- Handmade character remains visible without competing with the Primary action

### Tertiary / Text

- No container by default
- Uses Primary `#8A00DA` for the action label
- Underline only when the action is semantically a link, consistent with `typography.md`
- No paper silhouette by default

### Destructive

Uses the approved error palette and the destructive hierarchy defined below.

Destructive treatment remains part of the same organic button language. Do not use jagged, torn, burnt, or distressed silhouettes to communicate danger.

### Icon-only

- No universal fill
- May be free-standing or visibly contained depending on the relevant component/context
- Follows `icons.md`
- If visibly contained, uses the approved 12px icon-button structural radius

## Sizing

Button dimensions are content-driven.

### Standard button
- Vertical padding: 12px
- Horizontal padding: 16px
- Label: Lora 15px / 500
- Structural radius: 12px
- Height is determined naturally by content and padding

Do not introduce arbitrary fixed heights.

### Width behavior

Buttons may be:
- content-width
- full available width

Width is determined by the relevant composition or component specification.

Rules:
- Primary does not automatically mean full-width.
- Inline action groups may use content-width buttons.
- Forms and bottom-sheet actions may use full-width buttons when explicitly designed that way.
- Do not introduce fixed widths merely to make unrelated labels equal.

### Touch targets

Visible button size and interactive target size are not necessarily identical.

All interactive buttons must satisfy the touch-target guidance in `interface-craft.md`. If a visible treatment is smaller, the tappable region may extend invisibly around it.

Do not reduce label font size simply to preserve a fixed button dimension.

Universal wrapping/truncation behavior is not defined. If a real button requires a missing text-overflow rule, ask before implementing it.

## Organic Shape Treatment

Buttons use deliberately designed organic silhouettes rather than randomized distortion.

### Primary — Characterful Organic / Level 2

- Paper-cut silhouette is clearly visible.
- Controlled edge and corner asymmetry is allowed.
- Underlying geometry remains the approved 12px structural radius.

### Secondary — Restrained Organic / Level 1–2

- Visibly handmade
- Calmer than Primary
- Does not compete for visual dominance

### Tertiary / Text

- No paper-cut silhouette by default.
- Typography carries the action.

### Destructive

- Uses the same approved button shape language.
- Shape does not become more jagged or distressed because an action is destructive.

### Icon-only — Functional Organic / Level 1

When a visible container exists:
- irregularity remains very subtle
- small size keeps the shape close to its structural geometry

### Asset principle

Do not generate random edge variation at runtime.

A deliberate reusable button-silhouette family may be designed later, for example a small number of approved paper-cut silhouettes. Until such assets/rules are defined, implementation must not invent them.

## Icon Placement

Icons clarify button actions; they do not decorate them.

- Text-only buttons are valid.
- Use a leading icon when it meaningfully reinforces the action.
- Use a trailing icon only when the trailing position has semantic meaning, such as progression/disclosure or another explicitly defined action.
- Do not use both leading and trailing icons on an ordinary button by default.
- Use approved icon sizes from `icons.md`.
- Do not arbitrarily resize icons to fit a button.
- Icon and label are optically centered as one group.
- Icon-to-text spacing is 8px.
- Decorative stars, moons, herbs, sparkles, and other motifs are not button icons unless they communicate the action.
- Rich illustrated/product icons generally do not belong inside ordinary buttons unless explicitly designed for that component.

Icon-only buttons must use recognizable functional symbols, have accessible names, and meet touch-target requirements.

## Interaction States

Applicable buttons support:

### Default
Normal approved visual treatment.

### Pressed
Provides immediate tactile feedback.

- Structural radius remains unchanged.
- Approved paper silhouette remains unchanged.
- Follow `interface-craft.md` for pressed feedback: a small scale reduction within 0.95–0.98 with an approximately 200ms ease-out scale transition, respecting reduced motion.
- Its guidance permits choosing the component's scale within that range; this does not create unrelated motion tokens. A future approved `motion.md` may supersede this guidance.

### Focused
A visible focus treatment is required where applicable.

Primary `#8A00DA` is the existing focus color, but exact focus-ring geometry is not defined in this file. Do not invent it.

### Disabled
Uses the approved disabled surface, text, and border treatments where applicable.

Decorative treatment must not make a disabled control appear active.

### Loading
Communicates that the triggered action is processing.

- Button dimensions remain stable to prevent layout shift.
- Exact loader artwork, animation, and label behavior remain undefined until addressed by the relevant motion/feedback/component rules.

### Non-universal states

Success, error, and selected are not universal button states.

A specific flow may define one of these states when required, but implementation must not add them automatically.

## Destructive Action Hierarchy

There are two destructive emphasis levels.

### Standard destructive

For reversible or lower-consequence destructive actions:

- Error background: `#F8E7E7`
- Error text/icon: `#762323`
- Uses the standard organic button language

### High-consequence destructive

For sufficiently consequential destructive actions, a stronger treatment may be used:

- Background: `#762323`
- Label: `#FFFFFF`
- Uses the standard organic button language

Confirmation is not automatically required merely because a button is destructive.

Whether confirmation is necessary depends on consequence and reversibility and will be handled by the relevant interaction/feedback specification.

Communicate danger through color, wording, and context rather than exaggerated shape treatment.

## Button Groups & Action Hierarchy

- A decision group should generally have one visually dominant action.
- Primary + Secondary is allowed.
- Primary + Tertiary is allowed.
- Destructive actions do not automatically receive Primary styling merely because they are important.
- Do not place two Primary buttons beside one another in the same decision group.
- Inline actions use the approved 8px spacing.
- Stacked actions use the approved 12px spacing.
- Action order follows the logic of the specific flow.
- There is no global left/right or top/bottom button-order rule.
- Full-width stacked actions are allowed when the composition calls for them, including forms and sheets, but are not mandatory.
- Button groups do not automatically need a paper-cut container.
- Decorative elements must not sit between buttons in a way that makes their relationship unclear.
- There is no universal maximum number of buttons. If a screen requires many competing actions, resolve the information architecture during screen design rather than inventing a limit here.

## Visual Restraint

Primary buttons do not automatically receive stars, moons, sparkles, herbs, potions, or other magical decoration.

The approved color, typography, texture, and paper-cut silhouette already communicate product identity.

Use decorative motifs only when the relevant component or composition explicitly calls for them.

## Accessibility

Buttons inherit accessibility requirements from `interface-craft.md`.

In particular:
- controls must have clear accessible names
- icon-only buttons require accessible names
- touch targets must remain adequate
- state cannot depend solely on decorative treatment
- disabled controls must be perceivable as disabled
- functional meaning takes priority over visual theme

## Undefined Button Protocol

If a button requires a value, state, silhouette, width behavior, overflow behavior, icon treatment, focus treatment, loading behavior, or other rule that is not defined:

1. Check `buttons.md` and all relevant project skill files.
2. If an applicable rule exists, use it automatically.
3. If no rule exists, identify the exact missing decision.
4. Do not use a framework default, invent a new button variant, select a nearby token, generate random paper edges, or infer behavior from another component.
5. Ask the user to define the missing rule or explicitly authorize derivation.
6. If derivation is authorized, derive only the requested decision/group.
7. Do not generalize a screen-specific or one-off button treatment into a global rule without user approval.
