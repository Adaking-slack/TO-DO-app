# Floating Action Button (FAB)

## Purpose
The Home FAB has one action: **Create a new task**.

- No generic creation menu.
- No speed dial.
- No text label.

## Appearance
- Size: 56×56px.
- Structural radius: 16px.
- Character Paper silhouette: visibly hand-cut but controlled/polished.
- Fixed/reusable authored silhouette; never procedurally randomized.
- Surface: Primary `#8A00DA`.
- Plus icon: `#FFFFFF`.
- Plus icon size: 24×24px.
- Level 2 paper-cut character.
- No border by default.
- Elevation: Level 2.
- Fixed tactile texture asset at 6% opacity.
- Interaction/touch geometry remains a regular 56×56px region despite visual edge irregularity.

## Placement
- Fixed bottom-right.
- Right offset: 16px from viewport edge.
- Sits above, not inside, Bottom Navigation.
- Gap between FAB and top edge of Bottom Navigation: 16px.
- Structure: FAB → 16px gap → Navigation → device safe area.
- Must not overlap navigation destinations.
- Safe-area aware.
