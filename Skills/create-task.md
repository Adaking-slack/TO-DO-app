# Create Task — confirmed reference layout

This screen-specific specification records the user's confirmed choice of
the three-row reference layout over the earlier compact Priority utility row.

- Existing FAB opens the existing task editor as a floating modal sheet.
- External left/right/bottom inset: 16px plus native safe-area accommodation.
- All four structural corners: 32px. Content-driven height; internal scrolling
  adapts to the actual VisualViewport and keyboard.
- Existing sheet padding: 32px top, 24px sides/bottom. Level 2 elevation.
- Scrim: `rgba(26, 15, 46, 0.40)` from finishing.md. Underlying content is inert.
- Top actions: Close left, existing checkmark right. The checkmark validates
  and saves; there is no redundant bottom submission or Cancel control.
- Persistent Task Title label follows inputs.md; the field includes the
  existing 24px checkbox-style artwork as a non-interactive visual.
- Exactly three grouped detail rows: Description, Date and time, Reminder.
  Description is an editable growing textarea with the provisional icon.
- Date and time opens a secondary sheet reusing native date/time controls;
  time is optional and cannot exist without a date. Reminder reuses the
  existing single absolute date/time storage and native picker.
- Secondary Apply commits to the draft, Close/Escape discards that picker's
  changes. Focus returns to the original trigger. No new reminder offsets.
- Sub-task heading, then full-width Secondary Add sub-task action. New
  editable rows appear inline and receive focus. Rows have no extra card.
- No Priority, Category, Recurrence, Project, or Tags in the composer.
  Existing stored properties are retained when editing.
- Twig and opposite-edge vine/sparkle are two restrained decorative moments.
  Assets and decorative-only rules are recorded in icons.md and visual-language.md.
- Persistence, Today/Inbox filtering, existing Task Rows, and parent/subtask
  completion semantics are reused unchanged.
