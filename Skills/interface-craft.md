# Interface Craft Implementation Skill

## Purpose

Use this skill whenever designing, implementing, reviewing, or polishing
the witch-themed to-do application. It translates the interface-craft
guidance from the Interfaces Cheat Sheet into implementation rules for
this product.

This skill does **not** replace the project's design-system files.
`colors.md` and `typography.md` remain the source of truth for visual
tokens. If this skill calls for a visual value that those files do not
define, follow the project's undefined-value protocol: ask the user
before inventing a new design-system value.

## Priority of Rules

When implementing the product, use this order:

1.  Explicit user instruction for the current task.
2.  Existing project/product specification.
3.  `colors.md`.
4.  `typography.md`.
5.  This interface-craft skill.
6.  Framework/browser defaults only when they do not create a new design
    decision.

A craft recommendation must never silently override an explicitly
defined project token.

Approved conflict resolutions: `spacing.md` governs spacing values and
relationships, and `icons.md` governs icon artwork specifications. This
file governs existing motion and typography implementation guidance,
including tabular numerals. The approved font family and type-scale tokens
in `typography.md` remain unchanged. A future approved motion specification
may supersede this file's motion guidance.

------------------------------------------------------------------------

## 1. UI Geometry and Visual Polish

### Nested radii

When rounded containers are nested, their corner radii must look
concentric. The inner radius should visually follow the curve of the
outer container after accounting for padding.

Do not independently choose unrelated radii for a card and its nested
surface.

If the project has not yet defined the radius values needed for a
component, ask the user rather than inventing them.

### Optical alignment

Prefer perceived visual alignment over mathematically exact centering
when the two conflict.

This particularly applies to:

-   icons beside text;
-   play/arrow/chevron icons;
-   asymmetric witch-themed illustrations;
-   badges;
-   icon buttons;
-   decorative symbols;
-   text inside irregular visual containers.

Small optical adjustments are permitted only as positioning corrections.
They must not introduce new spacing-system tokens.

### Images and artwork

Where an image needs separation from its surrounding surface, use a
subtle inset-like `1px` outline rather than an unnecessarily heavy
border.

The reference technique uses a low-opacity outline offset inward by
`-1px`. Because this project has its own color system, do not invent the
outline color. Use an approved applicable token or ask the user to
define one.

Decorative witch-theme artwork must not interfere with interaction
targets.

------------------------------------------------------------------------

## 2. Motion and Interaction

### Transition only what changes

Never use:

``` css
transition: all;
```

Name the properties being animated.

### Pressed buttons

Interactive buttons should have tactile pressed feedback through a small
scale reduction.

The acceptable reference range is:

``` text
0.95–0.98
```

with an approximately `200ms ease-out` scale transition.

The exact scale value for a component is an implementation value, not
permission to create unrelated motion tokens. If the product later
defines a motion system, that system takes precedence.

### Icon replacement

When one icon changes into another, such as:

-   unchecked → checked;
-   add → success;
-   copy → check;
-   expand → collapse;

prefer a cross-fade with coordinated scale and blur rather than an
abrupt swap.

A suitable pattern is:

-   entering icon: small scale → full scale;
-   opacity: transparent → opaque;
-   blur: slight blur → sharp;
-   exiting icon: reverse the sequence.

Keep this transition short and responsive.

### Transitions vs. keyframes

Use transitions for interactive states that a user may interrupt or
reverse.

Use keyframes for self-contained sequences that run through once.

### Theme switching

If theme support is introduced, do not animate every color while
changing themes. Temporarily suppress transitions during the theme
switch.

A dark theme is **not currently defined** by the project's color system.
Do not create one unless the user explicitly defines it.

### `will-change`

Use `will-change` only for properties that are actually about to
animate, especially:

-   `transform`;
-   `opacity`;
-   `filter`.

Do not apply it globally or permanently without reason.

If iOS/Safari produces small animation-position jumps,
`will-change: transform` may be used on the affected animated element.

### Entrance animation

When multiple elements enter a screen, stagger them intentionally by
meaningful group or individual item rather than animating everything
simultaneously.

Examples for this app include:

-   task groups;
-   dashboard cards;
-   onboarding choices;
-   spell/decorative elements associated with a screen.

### High-frequency interactions

Avoid unnecessary animation on interactions users trigger constantly. A
task-list row should not perform an elaborate animation merely because
the pointer crosses it.

------------------------------------------------------------------------

## 3. Typography Implementation

The project's typography values are defined in `typography.md`. Do not
replace them with values from this skill.

### Font delivery

For web builds, serve Lora using `.woff2` where self-hosting is used. Do
not ship `.ttf` or `.otf` as the production webfont format.

### Changing numbers

Use tabular numerals for values whose digits change or need column
alignment, including:

-   timers;
-   task counts;
-   streaks;
-   progress statistics;
-   calendar/data columns;
-   changing numeric counters.

This does not authorize a new font. Continue using Lora.

### Long-form text

The Interfaces guidance recommends limiting long-form reading lines to
roughly `60–75` characters.

However, this project's maximum body-text width is intentionally
undefined in `typography.md`. Therefore, **do not automatically
establish a new max-width token from this recommendation**. When a
long-form reading surface is introduced, ask the user to approve its
width behavior.

### Text wrapping

For headings, prefer balanced wrapping where supported:

``` css
text-wrap: balance;
```

For short descriptions, prefer:

``` css
text-wrap: pretty;
```

Do not apply either treatment indiscriminately to long-form reading
content.

### Overflow protection

Where user-generated or unpredictable strings can escape their
container, use:

``` css
overflow-wrap: break-word;
```

Badges and short labels that must remain on one line may use:

``` css
white-space: nowrap;
```

Do not impose `nowrap` on content that needs to remain readable at
narrow widths.

### Font rendering

Apply web font smoothing once at the root rather than repeatedly per
component.

### Casing

Store copy in natural language casing. Use presentation-level text
transformation for UI elements whose design-system rule changes casing.

For this project:

-   labels are displayed uppercase;
-   buttons use sentence case;
-   navigation uses sentence case;
-   task titles use sentence case.

Do not manually store label strings in uppercase merely to achieve their
visual style.

### Punctuation

Use typographically appropriate punctuation in product copy:

-   curly quotation marks where appropriate;
-   en dash for ranges;
-   em dash for parenthetical asides;
-   the single ellipsis character `…` rather than three periods when
    representing an ellipsis.

### Links

Links are underlined by default according to `typography.md`.

Implement underlines so they respect the font's underline position and
avoid colliding unnecessarily with descenders where browser support
allows.

### Truncation

When text is truncated, the complete value must remain obtainable
through an appropriate accessible mechanism, such as an expanded view or
suitable tooltip.

Because the project's truncation policy is context-dependent, decide the
mechanism per component rather than imposing one global behavior.

------------------------------------------------------------------------

## 4. Color Architecture

All functional UI color values come from `colors.md`. Illustrations and
illustrated/product icons may use colors outside that palette; artwork
colors do not automatically become UI tokens.

### Purposeful tokens

Every color token must have a defined role. Do not create palette steps
merely to make the palette larger.

### Semantic tokens

Components should consume semantic role tokens rather than raw palette
primitives.

Prefer conceptual roles such as:

``` text
color.text.secondary
color.surface.card
color.border.subtle
color.status.error
```

rather than binding a component directly to a raw hue name.

### Naming

Name tokens for their role, not for their appearance or the first
component that happens to use them.

Do not create names such as:

``` text
red-button
sidebar-beige
blue-info-card
```

when the actual role can be expressed semantically.

### Brand terminology

Treat the project's brand color as the accent/brand role when code
architecture needs to distinguish it from textual "primary" roles.

Do not allow "primary" to ambiguously mean both primary text and brand
accent.

### No role leakage

Two roles may currently share the same hex value without being the same
semantic token.

Do not reuse a token solely because its current value happens to match
the desired color. Create or request the correct semantic role so future
changes do not couple unrelated elements.

This rule does **not** permit the AI to invent a new color. A new
semantic role may alias an already approved color only when its use is
clearly supported; otherwise ask the user.

### Contrast

Evaluate contrast against the surface the element actually appears on,
not merely against the page background.

Accessibility failures must be surfaced to the user rather than silently
"fixed" with an undefined color.

### Dark mode

No dark-mode palette is currently defined.

If dark mode is later introduced:

-   define it independently rather than mechanically reversing the light
    palette;
-   use one consistent switching strategy throughout the product.

### Gradients

Do not introduce gradients unless the product specification or user
explicitly calls for them.

If a gradient is approved, interpolation space may be chosen
deliberately for the intended visual result rather than accepted blindly
from defaults.

------------------------------------------------------------------------

## 5. Accessibility

Accessibility is part of component implementation, not a later cleanup
pass.

### Native semantics first

Use the correct native element whenever possible:

-   `<button>` for actions;
-   `<a>` for navigation;
-   `<input>`, `<textarea>`, `<select>` for form controls;
-   semantic headings for document hierarchy.

Do not make generic `<div>` elements behave like native controls when a
native control is available.

### Keyboard focus

Every keyboard-interactive element must have a visible `:focus-visible`
state.

Never remove an outline without providing an accessible replacement.

Use the focus color already defined in the project color system.

### Tab order

Only use `tabindex="0"` or `tabindex="-1"` when manual tabindex control
is actually required.

Do not use positive tabindex values.

### Icon-only controls

Every icon-only button must have an accessible name describing its
action.

Do not hide a focusable control from assistive technology.

### Alternative text

Write image alternative text according to the image's function rather
than its physical appearance.

Decorative witch-themed illustrations that convey no necessary
information should use empty alt text and stay out of the accessibility
tree where appropriate.

### Inputs

Every form field requires:

-   a real associated label;
-   an appropriate input `type`;
-   an appropriate `inputmode` where relevant.

Do not block paste.

### Disabled controls

Do not rely on a tooltip attached to a truly disabled element to explain
why it cannot be used.

If an explanation must remain reachable, provide visible explanatory
content or use an accessible disabled-state pattern that remains
focusable when appropriate.

### Validation

Do not disable submission simply because fields are currently
incomplete.

On submission:

-   validate;
-   identify invalid fields programmatically;
-   connect errors to their fields;
-   focus the first invalid field when appropriate.

Once a request actually starts, prevent accidental duplicate submission
as needed.

### Hit targets

Interactive targets must provide sufficient usable area.

Reference minimums:

-   at least `24 × 24px`;
-   preferably about `44 × 44px` on touch interfaces;
-   preferably about `40 × 40px` on desktop where feasible.

Extended hit areas must not overlap.

These dimensions are accessibility implementation constraints, not
authorization to create a general spacing scale.

### Decorative layers

Glows, gradients, sparkles, floating stars, magical particles, and other
non-interactive visual layers should use:

``` css
pointer-events: none;
```

when they overlap interactive regions.

### Hover

Place hover-specific styling behind a hover-capability media query so
touch devices do not retain misleading hover states after tapping.

### Reduced motion

Nonessential motion must respect the user's reduced-motion preference.

Prefer enabling decorative motion only when reduced motion has not been
requested.

### Live updates

Use polite status announcements for routine updates.

Reserve urgent alert announcements for errors or conditions that
genuinely require immediate attention.

### Never use color alone

Task status, priority, success, warning, error, selection, and similar
states must have another cue in addition to color, such as:

-   text;
-   icon;
-   shape;
-   underline;
-   status label.

### Skip navigation

For web layouts with substantial navigation, provide a skip-to-content
mechanism as the first keyboard-focusable control.

Anchored headings should account for sticky headers when scrolling into
view.

------------------------------------------------------------------------

## 6. Layout

### Group spacing

Spacing between distinct groups should be visibly larger than spacing
among items within one group.

As a general relationship, inter-group spacing should be at least about
twice intra-group spacing.

This is a proportional guideline only. Use the approved values and explicit
relationships in `spacing.md`; those mappings take precedence over this
guideline. Ask only when a required relationship is not defined there or
in another applicable project specification.

### Logical properties

Prefer logical CSS properties so layouts can adapt more naturally to
writing direction.

Use properties such as:

``` css
margin-inline-start
padding-inline-end
inset-inline
```

instead of unnecessarily hard-coding left/right relationships.

### Text containers

Do not set rigid width or height values that cause text to clip,
overflow, or break under localization, zoom, dynamic content, or
accessibility text sizing.

------------------------------------------------------------------------

## 7. Product Writing

### Buttons

Start action labels with a verb whenever practical.

Prefer:

``` text
Add task
Save changes
Delete task
Complete task
```

over vague labels such as:

``` text
OK
Yes
Done
```

when those vague labels do not communicate the action.

### Destructive confirmations

A confirmation action should repeat the consequence.

For example, a task-deletion dialog should pair a specific destructive
action such as `Delete task` with `Cancel`, rather than `Yes` and `No`.

### Terminology

Choose one term for the same action throughout a flow.

Do not alternate synonyms such as `Continue` and `Next` without a
meaningful distinction.

### Links

Link copy should describe where the link goes or what it opens.

Avoid generic text such as `Click here`.

### Capitalization

Follow `typography.md` for casing. Do not introduce arbitrary
capitalization per component.

### Toggles

Phrase toggle labels around the state or behavior that becomes active
when the toggle is on.

### Empty states

An empty state should:

1.  tell the person where they are or what is currently empty;
2.  provide useful context when needed;
3.  offer one clear next action.

Avoid dead-end messages that only state that nothing exists.

### Voice

Address the reader directly as `you` where direct address is needed.

------------------------------------------------------------------------

## 8. Witch-Theme Integration

The witch theme is a visual and narrative layer over a functional
productivity product. It must not reduce usability.

Use thematic decoration to reinforce:

-   identity;
-   delight;
-   empty states;
-   onboarding;
-   completion moments;
-   illustrations;
-   occasional micro-interactions.

Do not allow thematic styling to:

-   obscure task information;
-   replace standard interaction cues;
-   make icons ambiguous;
-   reduce text contrast;
-   shrink hit targets;
-   introduce inaccessible motion;
-   interfere with keyboard navigation;
-   make routine actions unnecessarily theatrical.

A task manager should remain immediately understandable even if all
decorative witch imagery were removed.

------------------------------------------------------------------------

## 9. Undefined-Value Protocol

This skill contains craft principles and some implementation techniques,
but it is **not permission to fill gaps in the design system**.

Whenever implementation requires an undefined design decision:

1.  Identify the missing property.
2.  Check the relevant project skill/design-system file.
3.  If the value is not defined, do not invent it.
4.  Tell the user exactly what is missing and where it is needed.
5.  Ask the user for the value or explicit permission to derive it.
6.  Record the approved decision in the appropriate project skill if
    requested.
7.  Continue only after the missing design decision has been resolved.

This applies to, among other things:

-   spacing;
-   border radii;
-   shadows beyond approved color information;
-   component dimensions;
-   icon sizing;
-   new colors;
-   new typography styles;
-   breakpoints;
-   animation tokens;
-   gradients;
-   illustration sizing;
-   grid rules;
-   responsive behavior not otherwise specified.

A numeric example in this skill is an implementation recommendation only
when explicitly described as such. It must not silently become a global
design token.

------------------------------------------------------------------------

## 10. Review Checklist

Before considering a screen or component complete, verify:

-   Design-system colors come from `colors.md`.
-   Typography comes from `typography.md`.
-   No undefined visual tokens were invented.
-   Nested rounded surfaces look concentric.
-   Icons and asymmetric objects are optically aligned.
-   Interactive motion is interruptible where appropriate.
-   High-frequency actions are not over-animated.
-   Reduced-motion preferences are respected.
-   Dynamic numeric values align cleanly.
-   Text wraps without avoidable awkwardness or overflow.
-   Truncated values remain recoverable.
-   Semantic color tokens are used by role.
-   Contrast is checked against the actual rendered surface.
-   Native semantic elements are used where possible.
-   Keyboard focus is visible.
-   Icon-only controls have accessible names.
-   Inputs have real labels.
-   Paste is not blocked.
-   Touch/click targets are adequately sized.
-   Decorative layers cannot intercept interaction.
-   Status is never communicated by color alone.
-   Group hierarchy is reinforced through spacing.
-   Text containers can adapt to content.
-   Buttons communicate their action.
-   Confirmation actions state their consequence.
-   Terminology remains consistent through each flow.
-   Empty states provide a useful next action.
-   Witch-themed decoration supports rather than competes with task
    completion.

## Source

This skill is adapted for this project from the interface-design and
design-engineering recommendations in the Interfaces Cheat Sheet at
`interfaces.dev/cheat-sheet`, consulted September 29, 2026. The
project's own design-system decisions take precedence over generic
recommendations.
