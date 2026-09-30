# Mobile Spacing Design System

## Purpose

This file defines the approved spacing system for the mobile-only
witch-themed to-do application.

These rules are authoritative for functional UI spacing. Do not invent,
interpolate, or introduce spacing values that are not explicitly defined
here unless the user explicitly authorizes a new value.

## Platform Scope

This product is mobile-only.

Spacing decisions must therefore prioritize:

-   compact mobile screens;
-   touch interaction;
-   safe areas;
-   mobile keyboards;
-   bottom sheets;
-   task-list density;
-   readable grouping;
-   fixed bottom actions.

Do not introduce desktop-specific spacing behavior.

------------------------------------------------------------------------

## Base Unit

The base spacing unit is:

`4px`

## Approved Spacing Scale

Only the following functional spacing values are approved:

  Token           Value
  ------------ --------
  `space-1`       `4px`
  `space-2`       `8px`
  `space-3`      `12px`
  `space-4`      `16px`
  `space-5`      `20px`
  `space-6`      `24px`
  `space-8`      `32px`
  `space-10`     `40px`
  `space-12`     `48px`

Do not introduce intermediate values such as `6px`, `10px`, `14px`,
`28px`, `36px`, or `44px` for functional layout without explicit user
approval.

If a functional layout genuinely requires more than `48px`, ask the user
before adding a new spacing value.

------------------------------------------------------------------------

## Spacing Relationship Model

The following describes the hierarchy created by the approved mappings.
It is guidance, not permission to freely substitute spacing tokens:

-   `4–8px`: tightly related information.
-   `12–16px`: elements within the same component or group.
-   `24px`: meaningful separation within a larger experience.
-   `32px`: distinct sections.
-   `40–48px`: exceptional or expressive breathing room.

Explicit component mappings in this file always take precedence.

------------------------------------------------------------------------

## Screen-Level Spacing

  Element                                            Value
  ----------------------------------------------- --------
  Left/right screen padding                         `16px`
  Top content padding                               `16px`
  Bottom content padding                            `24px`
  Major screen section → major screen section       `32px`
  Section heading → section content                 `12px`
  Related content group → related content group     `16px`

Top content padding is applied relative to the usable content area after
accounting for system safe areas or explicitly defined screen chrome.

------------------------------------------------------------------------

## Component Internal Spacing

  Element                                      Value
  ----------------------------------------- --------
  Card padding                                `16px`
  Task-row vertical padding                   `12px`
  Task-row horizontal padding                 `16px`
  Button horizontal padding                   `16px`
  Button vertical padding                     `12px`
  Input horizontal padding                    `16px`
  Input vertical padding                      `12px`
  Icon → text                                  `8px`
  Label → input                                `8px`
  Stacked form field → stacked form field     `16px`
  Task title → task metadata                   `4px`
  Item → item inside a card                   `12px`

These are spacing specifications, not component-size specifications.

For example, button padding does not define a global button height.
Component dimensions must be defined in the relevant component skill.

------------------------------------------------------------------------

## Task and List Spacing

  Relationship                                  Value
  ------------------------------------------ --------
  Task row → task row                           `8px`
  Task group → task group                      `24px`
  Task-group heading → first task              `12px`
  Subtask → subtask                             `8px`
  Parent task → first subtask                  `12px`
  Completed-task group → following section     `24px`

These relationships should preserve clear hierarchy between a task, its
metadata, its subtasks, and neighboring task groups.

------------------------------------------------------------------------

## Bottom Sheets

The approved structural reference is a near-full-height mobile bottom
sheet with generous content inset and substantial breathing room below
its rounded top edge.

### Bottom-sheet spacing

  Element                             Value
  -------------------------------- --------
  Horizontal padding                 `24px`
  Top padding                        `32px`
  Bottom padding                     `24px`
  Bottom-sheet section → section     `32px`
  Drag handle → content              `24px`

Bottom-sheet bottom spacing must also respect the device safe-area
inset.

The sheet's overall height is not determined by its padding. A bottom
sheet may extend substantially down the screen even when its content is
short. Do not increase spacing tokens merely to fill empty sheet space.

The bottom-sheet radius is intentionally not defined here. It belongs in
the radius system.

------------------------------------------------------------------------

## Modals and Dialogs

  Element                              Value
  --------------------------------- --------
  Modal/dialog padding                `24px`
  Modal content → action area         `24px`
  Stacked action → stacked action     `12px`
  Inline action → inline action        `8px`

Component-specific modal dimensions and radii are not defined by this
file.

------------------------------------------------------------------------

## General Content Relationships

  Relationship                                  Value
  ------------------------------------------ --------
  Heading → supporting description              `8px`
  Icon → associated content                     `8px`
  Title → secondary information                 `4px`
  Section → section                            `32px`
  Empty-state illustration → heading           `24px`
  Empty-state heading → description             `8px`
  Empty-state description → primary action     `24px`
  Success/error illustration → message         `24px`
  Message → supporting explanation              `8px`
  Supporting explanation → action              `24px`

------------------------------------------------------------------------

## Fixed Bottom Actions

Maintain at least:

`24px`

of visual separation between the final piece of scrollable content and a
fixed bottom action area.

This is in addition to any space required to ensure that the fixed
action container does not obscure scrollable content.

The action area must also account for the operating system's bottom
safe-area inset.

Do not treat `24px` as a substitute for safe-area accommodation.

------------------------------------------------------------------------

## Device Safe Areas

Use the operating system's native safe-area insets.

Do not create fixed design-system tokens intended to replace:

-   top notch / status-area insets;
-   Dynamic Island clearance;
-   bottom home-indicator clearance;
-   other operating-system-defined safe areas.

Design-system spacing is applied relative to the usable area where
appropriate.

------------------------------------------------------------------------

## Mobile Keyboard

Layouts must dynamically accommodate the mobile software keyboard.

Do not define or use a fixed `keyboard-spacing` token.

When the keyboard opens:

-   focused controls must remain usable;
-   relevant content must remain reachable;
-   fixed actions must not obscure the focused field;
-   the layout should respond to the actual keyboard/inset behavior of
    the platform.

------------------------------------------------------------------------

## Decorative Witch-Theme Spacing Exception

Decorative elements are allowed to break the `4px` spacing grid when
required for optical composition.

This exception applies only to non-functional visual elements such as:

-   sparkles;
-   stars;
-   magical marks;
-   illustration fragments;
-   spell effects;
-   ornamental details.

Decorative positioning may use optical offsets outside the approved
spacing scale.

However:

1.  Decorative offsets must not become functional layout tokens.
2.  Decorative elements must not change the spacing relationship between
    functional components.
3.  Decorative elements must not push task content, inputs, buttons,
    navigation, or other controls out of alignment.
4.  Decorative elements must not reduce usable touch-target areas.
5.  Decorative elements must not interfere with interaction.
6.  This exception does not authorize arbitrary functional spacing.
7.  Detailed decorative composition belongs in `visual-language.md`.

------------------------------------------------------------------------

## Navigation Spacing

Navigation-specific spacing is intentionally undefined.

The product's navigation should not be specified as a conventional
mobile navigation pattern before its witch-themed visual direction has
been explored and approved.

Before defining navigation spacing:

1.  Establish the product's visual language.
2.  Explore multiple navigation concepts.
3.  Select a navigation direction.
4.  Define its anatomy and behavior.
5.  Then document its spacing in `navigation.md`.

Do not use this file to infer navigation padding, icon gaps, label gaps,
navigation height, floating-action placement, or navigation-to-content
spacing.

If navigation must be implemented before those decisions exist, ask the
user.

------------------------------------------------------------------------

## Toast and Snackbar Spacing

Toast/snackbar positioning and edge spacing are intentionally deferred
to `feedback.md`.

Do not infer these values from screen padding or modal spacing.

------------------------------------------------------------------------

## Functional vs. Decorative Spacing

Always distinguish between:

### Functional spacing

Spacing that affects:

-   layout;
-   grouping;
-   interaction;
-   component geometry;
-   content positioning;
-   touch targets;
-   navigation;
-   forms.

Functional spacing must use an explicitly approved value.

### Decorative positioning

Optical placement of non-interactive visual decoration.

Decorative positioning may break the spacing grid under the decorative
exception, but it must never redefine functional layout.

------------------------------------------------------------------------

## Undefined Spacing Protocol

This rule is mandatory for any AI tool, coding agent, design agent, or
implementation system using this file.

If an interface requires a functional spacing value or relationship that
is not explicitly defined here:

1.  Do not choose a value.
2.  Do not select the nearest value from the spacing scale
    automatically.
3.  Do not interpolate between existing values.
4.  Do not use framework defaults as a substitute.
5.  Do not infer a value from a visually similar component.
6.  Identify the exact element and spacing relationship that is
    undefined.
7.  Notify the user that the spacing decision is missing.
8.  Ask the user to provide the value or explicitly authorize the AI to
    derive it.
9.  Continue only after the user supplies or authorizes the value.

If the user explicitly authorizes derivation for a specific group of
spacing decisions, the AI may derive those decisions using only the
approved spacing scale unless the user says otherwise.

That authorization does not extend to unrelated undefined spacing.

------------------------------------------------------------------------

## Intentionally Undefined

The following decisions are deliberately unresolved:

-   Navigation-specific spacing.
-   Navigation height and geometry.
-   Navigation icon/label relationships.
-   Floating-action-button positioning.
-   Toast/snackbar spacing.
-   Component dimensions.
-   Component heights.
-   Border radii.
-   General illustration composition beyond the decorative spacing
    exception.
-   Any functional spacing relationship not explicitly mapped in this
    file.

Do not resolve these automatically.

------------------------------------------------------------------------

## Implementation Review

Before completing a mobile screen, verify:

-   Functional spacing uses only approved values.
-   Screen horizontal padding is `16px` unless an explicitly defined
    component pattern overrides it.
-   Major sections use their defined separation.
-   Closely related content remains visually grouped.
-   Task hierarchy follows the task/list mappings.
-   Bottom sheets use their defined content spacing.
-   Safe-area insets are handled independently of design-system spacing.
-   Keyboard behavior is dynamic rather than based on a fixed spacing
    guess.
-   Fixed bottom actions do not obscure content.
-   Decorative witch-theme elements may be optically positioned but do
    not disturb functional layout.
-   Navigation spacing has not been invented before navigation is
    designed.
-   Undefined component-specific spacing has been surfaced to the user
    instead of guessed.
