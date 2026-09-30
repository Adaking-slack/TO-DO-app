# Personal Note

## Purpose
Defines the Home screen's free-writing Personal Note. This is not a standard input and is intentionally excluded from `inputs.md`.

## Appearance
- Small loose physical paper note, not a conventional textarea/card.
- Base surface: `#FFFBFF`.
- Character Paper silhouette: visibly hand-cut but polished and controlled.
- Fixed/reusable authored silhouette; never procedurally randomized.
- No standard input border.
- Left-aligned content.
- User text: Lora 15px/400, `#1A0F2E`.
- Placeholder: Lora 15px/400, `#8C8490`.
- Internal padding: 16px.
- Texture: fixed paper texture asset at 8% opacity.
- Resting elevation: Level 1.

## Sizing
- Width: available content width inside the existing 16px screen padding.
- Minimum height: 96px.
- Content-driven vertical growth.
- No internal scrollbar for the approved 30-word use case.
- Never shrink typography to fit.

## Word Limit
Maximum: 30 words.

- 0–25 words: no counter.
- 26–29 words: show `[count]/30 words`.
- 30 words: show `30/30 words`.
- Counter: Small Regular 12px/400, `#696868`.
- A 31st word is prevented.
- Pasting more than 30 words keeps only the first 30 words.
- Never delete words the user had already entered.
- Limit is not treated as an error; no red error treatment.
- Counter disappears again at 25 words or fewer.
- Counter must not overlap writing.

## Editing and Focus
- Tapping anywhere inside the note enters editing.
- Native text cursor appears.
- No conventional focused-input border.
- Surface color and silhouette do not change.
- Editing elevation: Level 2.
- `:focus-visible`: 2px solid `#8A00DA` focus ring with 2px offset.
- Focus treatment follows the visible paper silhouette as closely as implementation permits.
- No focus glow, scale effect, or layout shift.
- Placeholder disappears naturally when content is entered.

## Saving
- Auto-save as the user types.
- No permanent Save button.
- Content persists when navigating away and returning.
- Clearing the note saves the empty state.
- Successful saves do not trigger a toast.
- Saving must not interrupt typing or move focus.
- Persistence-failure feedback remains undefined until feedback/error handling is specified.
