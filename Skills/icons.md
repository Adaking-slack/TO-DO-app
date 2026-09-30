# Icon System

## Purpose

This file defines the icon artwork system for the mobile witch-themed to-do app.

It defines how icons are constructed, sized, styled, categorized, colored, and understood. It does not define the interaction-state presentation of the components that contain them.

Before creating or deriving an icon rule, check the existing project skill files. If an applicable rule already exists, use it. If a required rule is missing, ask the user to define it or explicitly authorize derivation.

## Core Direction — Mixed Ink

The icon system uses a **Mixed Ink** approach.

### Functional icons
Functional UI icons use cleaner, soft-marker-style hand-drawn linework:
- slightly imperfect
- easy to recognize at small mobile sizes
- visually soft rather than mechanically geometric
- restrained enough for repeated interface use

### Decorative and magical icons
Decorative, magical, and richer product icons may use:
- finer sketch details
- greater line-weight variation
- more expressive irregularity
- internal color and texture
- stronger storybook character

Both treatments must feel as though they belong to the same illustrator and visual system.

## Icon Size Scale

| Token | Size | Typical purpose |
|---|---:|---|
| `icon-xs` | 16px | Small metadata/supporting icons |
| `icon-sm` | 20px | Icons alongside text and compact controls |
| `icon-md` | 24px | Standard functional icon |
| `icon-lg` | 32px | Prominent actions and expressive functional icons |
| `icon-xl` | 48px | Large state/feature/product icons |

Artwork larger than 48px generally moves into illustration territory rather than ordinary UI iconography.

Visible icon size is separate from the interactive touch target. Touch-target requirements come from `interface-craft.md`.

## Functional Stroke Scale

| Icon size | Base stroke |
|---|---:|
| 16px | 1.5px |
| 20px | 1.75px |
| 24px | 2px |
| 32px | 2px |
| 48px | 2.25px |

The standard reference is:

**24px icon + 2px stroke.**

Stroke width does not scale proportionally with icon size.

### Stroke behavior

- Use rounded line caps and joins.
- Functional icons maintain a consistent base visual weight.
- Handmade character comes from subtle pressure and contour variation rather than dramatic stroke-width changes.
- Lines may have slight natural irregularity.
- Perfect mathematical symmetry is not required.
- At small sizes, simplify detail rather than making strokes excessively thin.
- Decorative/magical icons may use more line-weight variation.
- Functional iconography is outline-first.
- Small filled details are permitted where appropriate.

## Outline & Fill

Default functional icon treatment is hand-drawn outline.

Filled treatment is used selectively when it communicates meaningful state or is intentionally part of the artwork.

Rules:
- Do not automatically create filled versions of every icon.
- A fill change must communicate something or be an intentional illustration detail.
- Active navigation icons are not automatically filled; navigation state treatment will be defined in `navigation.md`.
- Filled states retain the hand-drawn character rather than becoming mechanically perfect glyphs.
- Do not rely on fill alone for critical state communication.
- Decorative/magical icons may contain filled areas as part of their artwork.

## Icon Vocabulary

### Universal functional icons

Examples:
- Search
- Back
- Close
- Edit
- Delete
- Settings
- More
- Add
- Common directional/disclosure symbols

Use familiar symbols redrawn in the approved hand-drawn style.

### Product-specific icons

Examples may include:
- Task
- Reminder
- Recurring task
- Priority
- Category

These may carry more visual personality, but their meaning must remain understandable.

### Magical and decorative icons

Examples may include:
- Moon
- Potion
- Crystal
- Spellbook
- Sparkles
- Herbs
- Candle
- Other approved visual-language motifs

These receive the greatest storybook expression.

### Meaning rule

**Style familiar actions; do not rename their meaning.**

Do not replace an established functional symbol with an unrelated magical metaphor merely to make the interface feel witch-themed.

A magical metaphor may become functional only when it is deliberately designed and introduced as part of the product. Implementation cannot make this decision independently.

Decorative magical icons must not visually imply interactivity when they are not interactive.

## Color Model

The icon system separates functional UI color from illustrative artwork color.

### Functional UI icons

Functional icons use the applicable approved UI colors and state treatments from `Colors.md`.

They do not introduce independent interface color tokens.

### Illustrated and product icons

Illustrated/product icons are **not restricted to the palette in `Colors.md`**.

They may use any colors necessary to produce rich, whimsical, hand-drawn storybook artwork. Their palettes may include additional browns, greens, blues, pinks, creams, ambers, or other colors when the artwork requires them.

These colors are **illustration colors, not UI tokens**.

A color introduced inside an illustrated icon does not become authorized for:
- buttons
- text
- borders
- cards
- inputs
- backgrounds
- navigation
- other functional UI

The actual expressive icon palette will be developed when the icon asset family is designed.

Do not prematurely convert illustration colors into design-system UI tokens.

## Detail Hierarchy

### 16–24px functional icons
- Very low detail
- Strong recognizable form
- No tiny decorative marks that disappear at normal mobile size
- Handmade character comes primarily from linework

### 32px icons
- May introduce limited secondary detail
- Must still read clearly as icons

### 48px illustrated/product icons
May include:
- internal lines
- small highlights
- color variation
- simple texture
- more visible hand-drawn character

When artwork requires substantial texture, shading, multiple objects, environmental detail, or complex composition, classify it as an illustration rather than an icon.

**Detail increases with size. Never shrink a detailed illustration and treat it as a small icon.**

## Designed Irregularity

Icons should look drawn by the same hand without looking mechanically generated.

Allowed:
- subtly imperfect circles
- slight natural wobble in straight lines
- subtle asymmetry
- minor contour variation
- optical rather than purely mathematical balancing

Rules:
- Do not add random imperfection merely to prove an icon is hand-drawn.
- Icons in the same family should have comparable visual weight.
- Functional recognizability takes priority over handmade character.
- The same icon retains its designed form throughout the product.

Do **not** simulate hand drawing by randomly distorting a conventional icon library at runtime.

Handmade irregularity must be intentionally designed into the approved asset.

## Icon Containers

Icons are free-standing by default.

Typical free-standing uses include:
- icons beside text
- metadata icons
- decorative icons
- icons inside components that already provide sufficient visual structure

A visible container may be introduced when functionally or visually necessary, including:
- icon-only buttons
- intentionally defined selected/active treatments
- prominent actions
- situations requiring stronger separation from the background

`radius.md` already defines the structural radius for icon buttons as 12px.

Illustrated/product icons may later use explicitly designed paper-cut backplates. These are part of the asset or component design and are not automatically added behind every icon.

Do not place every functional icon inside a circle, square, or colored container merely for consistency.

## Icon + Text Relationship

Use the approved **8px icon-to-text spacing** from `spacing.md` when an icon and text form one control or content unit.

Additional rules:
- Icon and label should read as one unit.
- Use optical vertical alignment rather than blindly centering SVG bounds.
- Icons must not visually overpower their labels.
- Leading icons are the default when an icon supports the meaning of a text label.
- Trailing icons are used when their meaning naturally belongs there, such as disclosure or an explicitly defined trailing action.
- Do not add icons beside ordinary text merely as decoration.
- If the text already communicates the action clearly and the icon adds no useful recognition or intentional character, the icon may be omitted.
- Decorative magical icons positioned near text are ornament, not part of the functional icon-label relationship.

## Interaction-State Separation

`icons.md` defines icon artwork. The component using an icon defines its state presentation.

General rules:
- Pressed states do not alter the icon's designed shape.
- Selected/active treatment may later use color, fill, a surrounding container, or another explicitly defined treatment.
- There is no universal active-icon style.
- Disabled functional icons follow the approved disabled UI treatment.
- Do not morph an unrelated icon into a loading indicator by default.
- Semantic feedback icons use the appropriate approved semantic treatment.
- Decorative illustrated icons do not receive interaction states unless they are genuinely interactive.

Navigation icon states will be defined when navigation is designed.

Follow the existing motion guidance in `interface-craft.md`, including icon replacement transitions and reduced-motion support. Motion decisions not covered there remain undefined; a future approved `motion.md` may supersede that guidance.

## Accessibility & Meaning

Accessibility rules in `interface-craft.md` remain authoritative.

Icon-specific requirements:
- Icon-only interactive controls must have an accessible name.
- Purely decorative icons should be hidden from assistive technology when they convey no information.
- Do not use an icon as the sole indicator of a critical state when an additional accessible cue is required.
- Do not assume users understand custom magical symbols.
- New product-specific symbols that are not self-evident should initially appear with a text label or otherwise be introduced in context.
- Familiar functional icons may stand alone when meaning is sufficiently established and the control still has an accessible name.
- Illustration detail must never compromise functional recognizability.
- Visible icon size does not define touch-target size.

## Asset Strategy

### Create Task assets
- `Icon/description.svg`: provisional file-backed Description icon, 24px with 2px rounded Mixed Ink strokes. Replaceable without changing component API/layout.
- `Icon/decorative/twig.svg`: transparent short leafy branch for paper corners.
- `Icon/decorative/vine.svg`: transparent elongated botanical for paper edges.
- `Icon/decorative/sparkle.svg`: transparent, restrained star cluster.
- Decorative assets have no background or baked shadow. Each is a separate reusable file.
- File references live in `src/artwork.ts`. Existing `InkIcon` calendar, bell, and checkmark artwork is reused without duplication.

The actual icon family will be designed separately after the icon system is defined.

Approved icons should be deliberate assets with consistent artwork rather than runtime-randomized variations.

When building the asset family:
- preserve the Mixed Ink system
- preserve the approved size/stroke relationships
- develop expressive illustration colors as needed
- maintain family-wide visual weight and authorship
- test functional icons at their real mobile sizes

## Undefined Icon Protocol

If an implementation requires an icon treatment that is not defined:

1. Check `icons.md` and all relevant project skill files.
2. Use an existing applicable rule automatically.
3. If no rule exists, identify the exact missing decision.
4. Do not substitute a framework icon style, invent a magical metaphor, create a new size, introduce a new UI color, or randomly derive a silhouette.
5. Ask the user to define the missing value/treatment or explicitly authorize derivation.
6. If derivation is authorized, derive only the requested decision or group.
7. Do not generalize a one-off icon decision into a global system rule without user approval.

The witch/storybook theme is not permission to sacrifice recognition or invent undefined icon behavior.
