# Bottom Navigation

## Destinations
Four destinations:
1. Home
2. Inbox
3. Calendar
4. Projects

Inbox is the capture destination for tasks lacking scheduling/organizational information. The exact qualification rules beyond the currently understood no-date use case remain intentionally undefined until the Inbox workflow is designed.

## Icon Assets
Navigation icons are existing authored project assets located in the project's icon/navigation folder.

Implementation must:
- Use those existing assets.
- Not generate replacements.
- Not substitute icon-library icons.
- Not redraw the icons.
- Use a selected icon asset only if an authored selected variant exists.
- If only one authored asset exists, keep it unchanged rather than inventing a selected variant.

## Container
- Fixed to bottom of viewport.
- Full viewport width.
- Primary Surface `#FFFBFF`.
- Minimal fixed paper texture: 4% opacity.
- Subtle Paper silhouette treatment.
- Subtly hand-cut top edge; bottom terminates naturally into viewport/safe area.
- No individual containers around destinations.
- No default outer border.
- Elevation: Level 2.
- Safe-area aware.
- Visually quieter than FAB and primary content.

## Dimensions and Spacing
- Navigation content height: 64px, excluding device bottom safe-area inset.
- Safe-area inset is added below the 64px content area.
- Four destinations receive equal horizontal width.
- Icon above label.
- Icon → label spacing: 4px.
- Icon/label group vertically centered within the 64px content area.
- Label: Lora 12px/400.
- Do not invent navigation icon dimensions; use authored asset dimensions unless the asset/specification establishes a standard.

## Selected State
Selected:
- Label: `#8A00DA`.
- Use authored selected icon variant if one exists; otherwise keep the authored icon unchanged.
- Indicator behind icon only.
- Indicator: 40×32px.
- Indicator surface: `#EEDCFA`.
- Structural radius: 12px.
- Level 1 controlled organic/paper-cut treatment.
- No indicator border or shadow.
- Icon centered within indicator.
- Indicator does not alter navigation-item dimensions.
- No font-weight change.

Unselected:
- Label: `#696868`.
- Existing authored icon.
- No indicator.

Navigation animation remains undefined until motion is specified.
