# Task Components

## Purpose
Authoritative specification for the mobile-only app's Task Row, Task Card, and Subtask Row. Read with `Colors.md`, `typography.md`, `spacing.md`, `radius.md`, `layout.md`, `icons.md`, `cards.md`, `buttons.md`, `visual-language.md`, and `interface-craft.md`.

Do not invent missing behavior or styling. If a requirement is not defined here or in an applicable existing specification, define it only when the relevant screen/workflow requires it.

## 1. Core presentations
- **Task Row:** compact/default representation for scanning.
- **Task Card:** richer representation when more information or interaction is needed in context.
- **Subtask Row:** subordinate representation associated with a parent.
- Completed, Overdue, In Progress, priority, Today, Upcoming, and Recurring are states/attributes, not separate component types.
- Row vs Card is determined by context, not task status. A state change must not switch component type.
- Within a repeated list, keep representation consistent unless that screen explicitly defines an exception.

## 2. Task Row
Anatomy: **Checkbox → Content (title + optional metadata) → Optional trailing action**.

Typography:
- Title: Lora 19px/600 (H3).
- Metadata: Lora 12px/400 (Small Regular).

Spacing:
- 12px vertical / 16px horizontal padding.
- Checkbox/icon → content: 8px.
- Title → metadata: 4px.
- Row → row: 8px.

Surface:
- Container-free by default.
- No background, border, shadow, or automatic divider.
- Storybook character comes from approved checkbox/icon/type treatments, not a card around every row.
- No fixed height; content growth increases height.
- No divider by default. A context may use the existing divider token only when spacing is insufficient.

## 3. Checkbox
- Visible size: **24×24px**.
- Radius: 4px.
- Larger accessible touch target may surround the visible control per `interface-craft.md`.
- Unchecked: `#686464` outline, transparent interior, slight hand-drawn line quality while remaining a recognizable checkbox.
- Checked: `#237635` fill with `#FFFFFF` hand-drawn checkmark.
- Same size, radius, and silhouette in all completion states.
- Checkbox is the completion control.
- No automatic sparkle, burst, glow, or completion animation.

## 4. Task title
Default:
- Lora 19px/600.
- Primary Text `#1A0F2E`.

Long titles:
- Wrap naturally.
- Never shrink typography to fit.
- No default one/two-line clamp.
- Component height grows.
- Checkbox and More align with the title area rather than vertically centering against a tall multi-line row.
- A future high-density context may explicitly define truncation.

## 5. Priority
Priority uses a **small hand-drawn flag icon beside the title**:
- High: `#762323`
- Medium: `#766A23`
- Low: `#233676`

Rules:
- Flag + color communicate priority; do not rely on color alone.
- No priority-colored background, card border, side strip, or default badge.
- The flag follows the title text, including at the end of a wrapped title; it does not occupy a permanent separate column and is not absolutely positioned.
- Completed tasks de-emphasize the priority indicator.
- Exact visible flag size remains undefined; follow `icons.md` and do not invent a new icon size.

## 6. Metadata
Optional task metadata may include date/time, reminder, recurrence, category, and status/progress. Priority remains beside the title.

Order when multiple attributes appear:
**Date/time → Reminder → Recurrence → Category → Status/progress**

Default metadata:
- Lora 12px/400.
- Secondary Text `#696868`.

Wrapping:
- May wrap naturally.
- Never shrink 12px type.
- Keep related icon+text pairs together.
- No horizontal scrolling.
- Do not truncate important information merely to preserve one line.
- If too much metadata exists, the context decides what deserves visibility instead of showing every stored property.

### Date/time
- Hand-drawn calendar icon + date.
- Hand-drawn clock icon + time.
- When both appear, keep them in one metadata sequence.
- “Due” need not repeat when context/icons make meaning clear.
- Exact locale/date/time formatting remains context-dependent per `inputs.md`.

### Reminder
- Small hand-drawn bell + optional concise text such as `30 min before`.
- Bell alone is allowed where meaning is clear.
- Multiple reminders must not produce multiple bell icons; compact multi-reminder treatment remains undefined.
- Informational by default.

### Category
- Hand-drawn tag icon + category name.
- Category-specific colors remain undefined. Do not invent a palette.

### Recurrence
- Familiar hand-drawn repeat icon + concise text such as `Daily` or `Every Monday`.
- Do not replace the familiar recurrence symbol with a magical metaphor.
- Informational by default.
- Complex recurrence functionality remains undefined.

## 7. Task states

### Overdue
- Title remains `#1A0F2E`.
- Checkbox remains normal unchecked.
- Overdue date/time and associated calendar/clock icon use `#762323`.
- `Overdue` may accompany the date/time as a non-color cue.
- Other metadata remains `#696868`.
- No red title, background, border, warning symbol, or shape change.

### In Progress
- Checkbox stays unchecked; do not use an indeterminate/partially filled checkbox.
- Title remains `#1A0F2E`.
- `In progress` metadata uses `#233676`.
- Other metadata remains `#696868`.
- No blue background, border, or shape change.
- Completed overrides In Progress.
- A non-color cue should exist, but the exact icon remains undefined until the icon family is designed.

### Completed
- Checkbox: `#237635` fill + `#FFFFFF` checkmark.
- Title: `#8C8490` + strikethrough; typography otherwise unchanged.
- Metadata: `#AAA2AD`.
- No whole-component opacity reduction, green title/background, shape change, sparkle, glow, or completion illustration.
- Priority/overdue/In Progress emphasis no longer competes for attention.
- Completion does not automatically move the task; sorting/movement is screen-level behavior.

### Scheduled vs unscheduled
- No explicit universal “Unscheduled” state.
- Show date/time when relevant; otherwise omit it.
- Do not show `No date`/`Unscheduled` by default or change shape/background/type.

### Selected / disabled
- No universal selected state.
- No persistent purple background after tapping.
- Multi-select must define its own treatment if introduced.
- No default disabled-task state. Unavailable behavior is handled at the specific control/action level unless a future product concept explicitly requires a task-level restricted state.

## 8. Task interactions and actions
Task Row:
- Checkbox → complete/uncomplete.
- Task title/content → open task details/editing experience.
- Optional trailing More (`•••`) → secondary task actions.
- Do not make the entire row one undifferentiated tap target.

Possible secondary actions include Edit, Delete, Reschedule, Set/change reminder, Change priority, and Change category, only when available in context.

Exact action-menu presentation remains undefined. No swipe actions are defined by default.

## 9. Task Card
Task Card inherits `cards.md`.

Base:
- Surface `#FFFBFF`.
- Radius 16px.
- Padding 16px.
- General internal spacing 12px.
- Restrained Level 2 paper-cut treatment.
- Subtle paper texture/depth.
- No border by default.
- Content-driven height.

Use Task Card when more task information/interaction is useful in context—not merely because a task is “important.”

Anatomy:
- Primary area: Checkbox + title + priority flag when applicable + optional More.
- Supporting area: relevant metadata.
- Optional expanded content: description, subtasks, and later-defined task-specific information.
- Do not automatically display every task property.
- No rigid header/body/footer.

Internal order:
**Primary task area → Metadata → Description → Subtasks**

Use existing 12px internal spacing. Missing content leaves no reserved space.

More:
- Top-right, aligned with the title/primary area.
- Uses Icon-only Button rules.
- Does not occupy metadata space.
- No separate header solely for More.

Task Card inherits the same Priority, Overdue, In Progress, and Completed treatments. Do not make states louder simply because the task is in a card.

No universal expand/collapse behavior, automatic chevron, or `Show more`. Cards grow naturally. Screen-specific expansion can be defined later if needed.

## 10. Task description
Task Row:
- Does not display the full description.
- No description/note indicator by default.

Task Card:
- May show description when useful.
- Lora 15px/400.
- Secondary Text `#696868`.
- Wraps naturally and increases card height.
- No inner container, quotation marks, notebook-note styling, or decorative treatment by default.
- Long-description truncation/expansion remains undefined.

## 11. Subtask Row
Anatomy: **Checkbox → Subtask title → Optional limited metadata**.

Title:
- Lora 15px/400 (Body Regular).

Checkbox:
- Same 24×24px, 4px radius, and completion treatment as tasks.

Surface:
- No card, background, border, or shadow.

Standalone/list hierarchy:
- Indent subtasks **32px** relative to parent.
- Parent → first subtask: 12px.
- Subtask → subtask: 8px.
- Multiple nested subtask levels are undefined; do not repeatedly add 32px.

Inside a Task Card:
- Do not apply the extra 32px indentation; the card already establishes hierarchy.
- Align subtasks with the card content area.
- No inner card/background or automatic divider.
- A `SUBTASKS` label may be used when useful using existing label typography, but is not mandatory.

## 12. Subtask properties and metadata
Subtasks may have:
- Completion state.
- Title.
- Optional due date/time.
- Optional reminder.

Subtasks do **not** have independent:
- Priority.
- Category.
- Recurrence.

Those belong to the parent task. If work genuinely requires its own priority/category/recurrence, it should generally be a separate task unless the product model is explicitly extended later.

Optional subtask metadata:
- Uses existing task date/time/reminder treatments.
- Small Regular 12px/400.
- 4px title → metadata spacing.
- Natural wrapping.
- No chips, badges, or additional containers.

## 13. Subtask states
Overdue:
- Uses the existing overdue treatment.
- Title stays `#1A0F2E`.
- Overdue date/time and calendar/clock icon use `#762323`.
- `Overdue` may accompany it.
- No red title/background/border.
- An overdue subtask does not automatically make its parent visually overdue.

Completed:
- Checkbox `#237635` + white checkmark.
- Title `#8C8490` + strikethrough.
- Metadata `#AAA2AD`.
- No opacity reduction, green title/background, shape change, or completion decoration.
- Updates any visible parent subtask-progress count.

## 14. Parent/subtask completion
- Parent and subtask completion are independent.
- Users may complete a parent while subtasks remain unfinished, but the app should confirm first.
- Completing the parent does not automatically complete subtasks.
- Completing all subtasks does not automatically complete the parent.
- Individual subtask completion states are preserved when the parent is reopened.
- Exact confirmation UI/copy remains undefined.

## 15. Subtask progress
Task Cards may optionally show compact progress text such as **`2 of 5 subtasks`**:
- Lora 12px/400.
- Secondary Text `#696868`.
- Optional, not mandatory.
- No progress bar or percentage by default.
- May be omitted when visible subtasks already make it redundant.

Task Rows may use this compact progress metadata to indicate subtasks without expanding them.

Task Rows do not expose subtasks inline by default and receive no automatic expansion chevron. Inline expansion is screen-specific if later required.

## 16. Subtask actions
- No permanent More button by default.
- Checkbox → completion.
- Title/content → details/editing.
- Delete, reschedule, reminder changes, etc. can be accessed through that experience.
- A specific context may expose a trailing action when genuinely necessary.
- No swipe actions by default.

## 17. Alignment
For Task Rows:
- Checkbox top-aligns with the title area.
- Content establishes vertical flow.
- More top-aligns with the title area.
- Checkbox/More do not vertically center against the entire row when metadata makes it taller.
- One-line rows should remain optically aligned.
- Minor optical adjustments may follow `interface-craft.md` without creating new spacing tokens.

## 18. Empty task groups
If a group has no tasks:
- Do not render an empty Task Row/Card or disabled placeholder.
- Empty-state messaging, illustration, and CTA belong to screen/section design.

## 19. Intentionally undefined
Define these only when a real screen/workflow needs them:
- Exact Task Details presentation.
- Exact task action-menu presentation.
- Exact priority-flag visible size beyond `icons.md`.
- Exact In Progress icon.
- Category-specific colors.
- Complex recurrence functionality.
- Long-description truncation/expansion.
- Inline Task Row subtask expansion.
- Swipe gestures.
- Multi-select behavior/treatment.
- Locked/restricted/archived task states.
- Multiple nested subtask levels.
- Multiple-reminder compact representation.
- Parent-with-unfinished-subtasks confirmation UI/copy.
- Screen-level sorting or movement of completed tasks.

## Implementation rule
Before extending task components:
1. Check this file and applicable existing design-system specs.
2. Reuse an existing rule when one applies.
3. Do not invent missing values, states, interactions, icons, or treatments.
4. Define genuinely missing requirements only when the relevant screen/workflow requires them.
