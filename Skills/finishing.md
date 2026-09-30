# Shared Finishing

## Paper Silhouette Strengths

### Subtle Paper
Almost regular geometry with very slight controlled edge irregularity.

Current Home uses:
- Bottom Navigation
- Selected navigation indicator

### Character Paper
Visibly hand-cut but polished and controlled.

Current Home uses:
- Personal Note
- FAB

### Expressive Paper
Reserved for future feature cards, empty states, onboarding, achievements, and similar expressive moments. Exact treatment remains undefined and is not required for the current Home screen.

### Silhouette Rules
- Silhouettes are fixed/reusable authored shapes.
- Never generate random border radii, clipping points, or new shapes per render.
- Visible irregularity must not change interaction geometry.
- No ripped, burnt, distressed, or aggressively jagged edges.

## Texture
Use fixed/reusable texture assets; never procedurally randomize them.

- App background: light paper texture at 4% opacity.
- Personal Note: paper texture at 8% opacity.
- FAB: tactile texture at 6% opacity.
- Bottom Navigation: minimal paper texture at 4% opacity.
- Selected navigation indicator: no additional texture.
- Task Rows: no texture because they are container-free.

Texture must not reduce text/icon contrast and does not create new surface-color tokens.

## Focus Ring
Default approved focus-visible geometry:
- 2px solid `#8A00DA`.
- 2px offset.
- Apply through `:focus-visible`, not every pointer/touch interaction.
- Follow the component's visible outer silhouette as closely as implementation permits.
- Regular controls follow their approved structural radius.
- Ring sits outside the component.
- No glow or additional focus shadow.
- No layout shift.
- Existing borders remain intact underneath.

## Borders
Where an approved component requires a standard visible border but its specification does not define border width:
- Width: 1px.

This rule does not add borders to components whose specification says they have no border.

Focus rings are separate and remain 2px with a 2px offset.

## Elevation
Use `elevation.md`. Do not invent component-specific shadows.
