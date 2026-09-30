# Input System

## Purpose

This file defines foundational input patterns for the mobile witch-themed to-do app.

Use it with `Colors.md`, `typography.md`, `spacing.md`, `radius.md`, `icons.md`, `visual-language.md`, and `interface-craft.md`.

Before defining or implementing an input value or treatment, check the existing project skill files. If an applicable rule already exists, use it automatically. If a required rule is missing, ask the user to define it or explicitly authorize derivation.

## Foundational Input Types

1. Single-line text
2. Multiline text / textarea
3. Search
4. Select / picker trigger
5. Date / time trigger

Defining these types does not require every screen to use them.

Checkboxes, toggles, radio buttons, segmented controls, and the future notebook/free-writing experience are not part of this input family.

## Inherited Foundations

- Input text: Lora 15px / 400
- Placeholder: Lora 15px / 400
- Label: Lora 12px / 400 / UPPERCASE
- Label → input: 8px
- Input horizontal padding: 16px
- Input vertical padding: 12px
- Stacked fields: 16px
- Structural radius: 12px
- Input background: `#FFFBFF`
- Default border: `#D8C5E3`
- Focused border: `#8A00DA`
- Error border: `#762323`
- Disabled surface: `#E9E2EC`
- Disabled border: `#D8D0DC`
- Primary text: `#1A0F2E`
- Secondary text: `#696868`
- Muted text: `#8C8490`
- Disabled text: `#AAA2AD`

## Default Visual Treatment

Inputs use a restrained hand-cut paper treatment.

- Background: `#FFFBFF`
- Border: `#D8C5E3`
- Structural radius: 12px
- Text: `#1A0F2E`
- Placeholder: `#8C8490`
- Padding: 12px vertical / 16px horizontal
- Texture: very subtle or none
- Shape hierarchy: Level 1 Functional Organic
- Shadow: none by default

The visible field should not feel like a mechanically perfect generic rounded rectangle, but irregularity remains subtle. One or two restrained contour deviations may give the field a gently hand-cut quality.

The interaction geometry remains regular.

Exact reusable paper-cut input silhouettes are not yet defined. Do not generate random edge distortion at runtime.

## Input States

### Default
Uses the approved default treatment.

### Focused
- Border: `#8A00DA`
- Structural radius remains 12px
- Visible silhouette does not morph
- No automatic glow or shadow
- Additional focus-ring geometry remains undefined

### Filled
- Retains the normal structural treatment
- Entered text: `#1A0F2E`
- Filling a field does not automatically change its surface or border color

### Error
- Border: `#762323`
- Error message may appear below the field using `#762323`
- Error must not be communicated by color alone
- No shaking, jagged edges, or shape changes are implied by the error state

### Disabled
- Surface: `#E9E2EC`
- Text: `#AAA2AD`
- Border: `#D8D0DC`
- Must remain recognizable as a field while clearly unavailable

### Success
There is no universal success state for inputs.

A particular flow may define explicit confirmation when it is useful, but implementation must not automatically add green borders, checkmarks, or other success decoration to valid fields.

## Labels, Placeholders & Helper Text

### Labels
- Lora 12px / 400
- UPPERCASE
- 8px above the field
- Remain visible when the user enters text
- Placeholder text must not replace a necessary field label

Required/optional indicators are not yet defined.

### Placeholders
- Lora 15px / 400
- Color: `#8C8490`
- Used for examples or guidance
- Not a permanent substitute for field identification
- Disappear naturally as text is entered

### Helper text
- Lora 12px / 400
- 8px below the input
- Normal helper text: `#696868`
- Error helper/message: `#762323`
- Only shown when additional guidance is genuinely useful

## Icons Inside Inputs

Input icons inherit `icons.md`.

- Leading icons are allowed when they clarify a field's purpose.
- Trailing icons are allowed when they perform or communicate a specific function.
- Leading and trailing icons may coexist when both have genuine functions.
- Icon → text spacing: 8px
- Use approved icon sizes from `icons.md`; do not create input-specific arbitrary sizes.
- Functional icons use the cleaner hand-drawn icon treatment.
- Decorative illustrated icons should generally remain outside functional input boundaries.
- Do not add magical icons merely to make a field feel themed.
- Interactive trailing icons require their own adequate touch targets.
- Decorative elements must not interfere with typing, selection, cursor placement, or touch targets.

## Single-Line Text Input

The single-line field uses the default input treatment and state system.

Its exact purpose, keyboard configuration, validation, and submission behavior are determined by the component or flow using it.

Do not invent field-specific behavior globally.

## Multiline Text / Textarea

Multiline fields inherit the standard input styling.

- Background: `#FFFBFF`
- Structural radius: 12px
- Horizontal padding: 16px
- Vertical padding: 12px
- Text begins at the top-left
- Uses the restrained Level 1 organic treatment
- Focus, error, and disabled states follow the standard input rules
- No decorative paper lines by default
- No mobile resize handle
- Character counts are not universal

A textarea may grow with content when appropriate.

If a particular flow requires a fixed or maximum height with internal scrolling, that behavior must be explicitly defined for that component.

A taller textarea does not automatically become a Level 2 expressive surface.

The future notebook/free-writing experience is a separate component and may receive a more distinctive visual treatment.

## Search

Search remains part of the input family.

- Uses the standard surface, border, radius, padding, and Level 1 organic silhouette
- Uses a recognizable functional hand-drawn search icon on the leading side
- Placeholder may describe searchable content
- A Clear control may appear on the trailing side when text exists
- Clear must have an accessible name and adequate touch target
- Search results and empty-result states belong to the screen, not the input
- Do not replace the familiar search symbol with a magical metaphor
- Do not automatically attach a Search button
- No special glow, shadow, sparkle animation, or active shape expansion

Whether search updates live while typing or requires explicit submission is context-dependent and remains undefined globally.

## Select / Picker Trigger

A select/picker trigger is visually related to an input but is not a text-entry field.

- Surface: `#FFFBFF`
- Border: `#D8C5E3`
- Structural radius: 12px
- Padding: 12px vertical / 16px horizontal
- Level 1 Functional Organic silhouette
- Selected value: `#1A0F2E`
- Empty/unselected prompt: `#8C8490`
- Uses a recognizable trailing disclosure icon
- Entire field is tappable
- Does not display a text cursor
- Does not become editable unless explicitly designed as a searchable/select hybrid
- Focus and disabled treatments inherit the input system
- Error treatment may be used when a required selection is invalid or missing

The menu, bottom sheet, picker, or other selection interface opened by the trigger is not defined here.

## Date & Time Triggers

Date and time triggers reuse the select/picker-trigger pattern rather than creating a separate visual language.

- Same structural and visual treatment as Select / Picker
- Values use Lora
- Empty state: `#8C8490`
- Selected value: `#1A0F2E`
- Date may use a recognizable functional hand-drawn calendar icon
- Time may use a recognizable functional hand-drawn clock icon
- Entire field is tappable
- No text cursor unless a specific flow explicitly permits manual entry
- Default, focused, error, and disabled behavior inherits the input system
- Magical decoration does not replace recognizable calendar or clock symbols

The actual date/time picker interface is not defined here.

Date and time formats are not globally fixed in this file. They should follow the product's eventual locale requirements.

A future expressive lunar-calendar experience, if designed, is a separate component rather than the default date-input pattern.

## Shape & Texture Restraint

Inputs are functional controls first.

Compared with task cards, primary buttons, bottom sheets, and expressive surfaces:
- paper-cut irregularity is subtler
- texture is minimal or absent
- depth is minimal
- decoration is minimal

The theme should remain perceptible without reducing clarity or typing usability.

## Accessibility

Inputs inherit the accessibility requirements in `interface-craft.md`.

In particular:
- fields requiring identification must have persistent accessible labels
- interactive icons require accessible names
- touch targets must remain adequate
- errors must not rely on color alone
- disabled states must be perceivable
- decorative assets must not interfere with interaction
- familiar functional symbols should remain recognizable

## Undefined Input Protocol

If an input requires a value, state, validation behavior, focus treatment, overflow rule, picker presentation, keyboard behavior, character limit, required/optional indicator, silhouette, or other rule that is not defined:

1. Check `inputs.md` and all relevant project skill files.
2. If an applicable rule already exists, use it automatically.
3. If no rule exists, identify the exact missing decision.
4. Do not invent a framework default, arbitrary token, magical treatment, or new variant.
5. Ask the user to define the missing rule or explicitly authorize derivation.
6. If derivation is authorized, derive only the requested decision/group.
7. Do not generalize a screen-specific treatment into a global input rule without user approval.
