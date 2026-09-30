# Visual Language

## Product Direction
The product uses a **whimsical witch** visual language for a mobile-only productivity/to-do app.

The approved personality is:

- Storybook foundation
- Modern UI structure
- Selective experimental magic

The interface must remain clear and recognizable as a productivity product. Witch-themed expression adds identity, atmosphere, and delight without making ordinary interactions difficult to understand.

## Core Visual Principle
**Hand-drawn storybook + organic shapes + controlled irregularity + selective handmade texture + sparse-to-moderate decoration + hand-drawn iconography.**

Magic should be concentrated at intentional moments, not applied everywhere.

## Illustration Style

### Approved Direction
**Hand-drawn storybook**

### Characteristics
- Sketchy, hand-drawn linework
- Visible organic imperfection rather than mechanically perfect geometry
- Textured brush treatment
- Subtle paper/storybook character
- Soft, expressive color application
- Warm, whimsical presentation
- Organic silhouettes and shapes
- Authored rather than generic vector assets
- Modern enough to coexist with functional mobile UI
- Consistent treatment across characters, objects, decorative illustrations, and illustrated icons

### Avoid
- Generic flat-vector/corporate illustration
- Photorealism
- Highly realistic fantasy painting as the default
- Glossy 3D as the default
- Perfectly geometric illustration that removes the hand-drawn character
- Excessive detail inside functional UI
- Inconsistent illustration styles

## Shape Language

### Approved Direction
**Organic Storybook**

The hand-drawn character extends into the UI rather than existing only in illustrations.

- Containers may feel like paper cutouts, notebook pieces, or hand-crafted labels.
- Edges may have subtle organic irregularity rather than perfect mathematical geometry.
- Slight asymmetry is allowed.
- Shapes should remain soft and readable, not distressed or heavily torn.
- Functional meaning and touch geometry remain conventional even when the visible silhouette is organic.
- Existing `interface-craft.md` rules still apply.
- Approved radius tokens govern the underlying functional geometry; visible paper treatment may introduce controlled organic variation where this file permits it.

## Degree of Irregularity

### Approved Direction
**Controlled irregularity**

Handmade character should be clearly visible while remaining polished.

- Cards, buttons, inputs, sheets, and other approved containers may use slightly imperfect edges and subtle asymmetry.
- Irregularity must never make an element look accidentally misaligned, damaged, crudely drawn, or difficult to use.
- Repeated components should remain recognizably part of the same system; variation between instances should be restrained.

## Container Treatment

### Approved Direction
**Paper Cutout**

The visual metaphor is gently hand-cut storybook paper, not ripped, burnt, distressed, or aggressively jagged paper.

| UI element | Paper-cut treatment |
| --- | --- |
| App background | No cutout edge; subtle paper texture only |
| Standard/task cards | Yes — subtle |
| Feature/special cards | Yes — more expressive |
| Bottom sheets | Yes |
| Modals | Yes |
| Banners / empty-state containers | Yes |
| Primary buttons | Yes — subtle |
| Secondary buttons | Yes — subtle |
| Inputs | Very subtle — nearly regular silhouette |
| Chips/tags | Very subtle |
| Navigation container | Undefined until navigation exploration |
| Icon buttons | No irregular silhouette by default |
| Toggles / checkboxes / radio controls | No |
| Menus / option lists | Paper-cut outer container; internal rows remain clean |

The underlying interaction/touch geometry remains regular even when the visible paper edge is imperfect.

## Texture Strategy

### Approved Direction
**Selective surfaces, extending lightly into the wider interface.**

- App background: light paper texture
- Cards: subtle handmade/paper texture
- Bottom sheets: more noticeable handmade texture
- Modals: more noticeable handmade texture
- Primary buttons: light tactile texture where appropriate
- Inputs and small controls: minimal or no texture
- Navigation: minimal texture; exact treatment remains dependent on navigation exploration
- Illustration-led and special cards: may use more expressive texture

Texture intensity should generally increase with the size and storytelling importance of a surface. Small functional controls remain cleaner.

Exact texture asset, opacity, numeric strength, blending method, and implementation values remain undefined and must not be invented.

## Depth & Layering
Depth should communicate **physical paper layering**, not a generic floating-card or glass-panel aesthetic.

- Standard cards use very subtle depth, like thin paper resting on the background.
- Bottom sheets and modals use stronger depth so their layer is clearly distinguishable from the screen beneath.
- Special cards, onboarding, empty states, and illustration-led moments may use 2–3 visibly overlapping paper pieces.
- Buttons use minimal depth; shape, color, and texture do most of the work.
- Inputs remain almost flat; their boundary communicates the control more than elevation.
- Decorative objects may overlap container edges when intentional, but must not obscure content or interaction targets.
- Avoid large blurry shadows beneath every component.

Exact shadow values, shadow colors, opacity, blur, spread, offsets, and elevation tokens are intentionally undefined here and belong in `elevation.md`.

## Motif Hierarchy

### Primary Motifs
- Stars and sparkles
- Moon/lunar forms
- Botanicals: leaves, herbs, small branches
- Spellbooks/books
- Potion bottles

### Secondary Motifs
- Crystals
- Candles
- Mushrooms
- Lanterns
- Magical smoke/trails
- Constellations
- Arched windows
- Black cat/familiar

The black cat should behave primarily as a character/familiar rather than a generic icon used everywhere.

### Scene-Building Motifs
Reserve primarily for onboarding, empty states, celebrations, feature introductions, and other illustration-led experiences:

- Witch character
- Magical rooms
- Shelves of books/potions
- Cauldrons
- Floating magical environments/islands
- Larger celestial scenes

## Motif Restraint
Do not convert every ordinary interface concept into a witch-themed metaphor.

- Calendar may remain a recognizable calendar.
- Search remains recognizable as search.
- Settings uses a recognizable settings symbol.
- Navigation must remain understandable without requiring users to decode magical objects.

Magical vocabulary adds identity without replacing established interaction conventions unless an explicitly approved design calls for it.

## Decorative Density

### Approved Direction
**Restrained decorative density — sparse-to-moderate.**

- Task-heavy screens stay calm and use low decoration.
- Normal screens generally contain 1–2 noticeable decorative moments.
- Feature/special cards should emphasize one primary expressive treatment at a time rather than maximizing every effect.
- Onboarding, empty states, achievements, and other storytelling moments may be more expressive.
- Texture, irregular edges, ornament, and illustration overlap should not all compete at maximum intensity simultaneously.
- Repeated components are calmer than one-off storytelling components.
- Empty space is intentional and should not be filled merely because magical decoration is available.
- If removing a decoration significantly improves scanability without losing the intended identity, prefer the simpler treatment.

**Principle: magic concentrated at moments, not everywhere.**

## Ornament Style

### Approved Direction
**Mixed restraint**

- Corner ornaments are the primary treatment: botanicals, small celestial elements, and sparkles.
- Floating ornaments may appear selectively in intentional negative space.
- Border ornaments are reserved for special surfaces such as onboarding, empty states, achievements, feature cards, or particularly expressive modals.
- Normal task cards and information-dense areas should not receive elaborate ornamental borders.
- Ornamentation must remain within the approved sparse-to-moderate decorative density.

## Illustration-to-Container Interaction

| Situation | Rule |
| --- | --- |
| Standard task cards | Illustrations remain mostly inside the container |
| Special/feature cards | Illustration may intentionally overlap the paper edge |
| Bottom sheets | Decorative illustration may enter from corners/edges but stays away from primary controls |
| Modals | Illustration may overlap the top or corners to strengthen the storybook composition |
| Empty states | Freer composition; illustration may extend beyond its content container |
| Onboarding/storytelling | Freest composition; layering and overlap are encouraged |
| Inputs/forms | Decoration stays outside functional input boundaries |
| Text | Illustrations never cross text or reduce readability |
| Interactive controls | Decoration never covers or visually competes with the control |

Edge-breaking must feel intentional rather than random. On an ordinary screen, only one or two visual elements should typically break their container boundaries.

## Iconography

### Approved Direction
**Hand-drawn icons**

All product icons use hand-drawn, slightly imperfect linework consistent with the illustration system, including functional icons such as calendar, search, settings, reminder, edit, delete, and navigation icons.

Recognition takes priority. Familiar symbols must not be distorted merely to make them feel magical.

Use the approved artwork, size, and stroke rules in `icons.md`. Interaction-state presentation belongs to the component using the icon; do not infer states that remain undefined there.

## Characters
Characters follow the hand-drawn storybook illustration language.

Current visual exploration includes a witch character and black-cat familiar, but their exact appearance, anatomy, clothing, age, proportions, poses, and recurring usage have not been formally specified.

Generated reference imagery is not an exact character specification.

## Objects
Magical objects such as books, potions, candles, crystals, moons, botanicals, and mushrooms should share:

- Hand-drawn outlines
- Organic shape variation
- Storybook texture
- Consistent level of detail
- Expressive but controlled color
- Enough simplification to remain legible at mobile sizes

## Decorative Elements
Approved decorative vocabulary includes:

- Small sparkles
- Stars
- Lunar shapes
- Botanical flourishes
- Hand-drawn ornamental lines
- Small magical trails
- Illustration-led corner/edge decoration where appropriate

Decorative elements may use optical, off-grid placement as permitted by `spacing.md`, but must not alter functional spacing, reduce touch targets, obscure text, or interfere with interaction.

## Relationship to Colors
Functional UI colors must follow `colors.md`.

Illustrations are created outside the UI palette and are not restricted to it. This includes illustrated/product icons as defined in `icons.md`.

Artwork colors do not become approved UI tokens. Do not sample illustration colors for functional text, controls, borders, surfaces, or navigation without approval.

## Relationship to Interface Craft
Before defining a new visual behavior, check `interface-craft.md`.

Existing interface-craft rules take precedence where applicable. This visual language must not override accessibility, interaction clarity, semantic meaning, optical alignment, nested-radius behavior, or other already-defined interface rules.

## Undefined Visual Decisions
The following remain intentionally undefined:

- Exact character design
- Exact black-cat/familiar design
- Navigation visual treatment
- Exact texture asset and implementation
- Texture opacity and numeric strength
- Illustration stroke width
- Icon treatments not already defined in `icons.md` or the relevant component specification
- Exact shadow/elevation values
- Motion behavior for magical/decorative elements
- Any special component silhouette not explicitly covered by the paper-cut mapping

These must be defined in the appropriate subsequent design-system skill rather than inferred from generated examples.

## Implementation Rule
When applying this visual language:

1. Check existing design-system skill files first.
2. Use an existing approved rule automatically when one applies.
3. Do not infer a missing specification from moodboards, generated examples, or this document's qualitative language.
4. If no applicable rule exists, identify the exact missing decision.
5. Ask the user to define it or explicitly authorize derivation.
6. Only then document and implement the new rule.
