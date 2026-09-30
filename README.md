# A little magic — Home

Mobile-only React + TypeScript + Vite implementation. Approved specifications live in `Skills/`.

## Run

```sh
npm install
npm run dev
```

Open the local URL in a phone viewport. No desktop/tablet variant or breakpoint is implemented.

```sh
npm run build
npm test
npx playwright install chromium
npm run test:browser
```

## Implemented

- Greeting, directly editable 30-word Personal Note, Today count/list, fixed Create task FAB and four-destination navigation.
- Local browser persistence via `src/storage.ts`. No seeded user tasks, backend, authentication or remote persistence. Empty installation correctly shows `Today · 0`.
- Tasks scheduled for the device's local calendar day, including completed tasks, are counted. Stored order is retained; completion does not reorder rows. The clock refreshes while open and on foregrounding.
- Task Row completion, wrapping titles, priority, optional time/reminder/recurrence/category/status/subtask-progress metadata. Today context makes repeating the date unnecessary.
- Note word counting treats whitespace-delimited text as words. Paste truncates the inserted content to available capacity, preserving existing text outside the selected range. Composition input is validated on commit. Clearing is saved.
- Lora is served locally as WOFF2. The app needs no network connection for fonts/assets after loading.

## Assets

`public/assets/paper/` contains fixed reusable fine grain and authored SVG silhouettes for the note, FAB, navigation top edge and selected indicator. The same fine grain is reused at the exact approved 4% / 8% / 6% / 4% opacities. No per-render randomization.

`public/assets/navigation/` contains byte-identical copies of Home, Inbox and Calendar PNGs from `Icon/Navigattion/`. Their spelling/extension differences are normalized only in the copies. The source files remain intact.

## Integration boundaries / outstanding decisions

`src/actions.ts` dispatches the typed `little-magic:action` event. App connects Create Task, task editing, Home/Inbox navigation, and unfinished-subtask confirmation. Calendar and Profile remain future destinations.

TaskEditor uses `taskRepository.upsert(task)` to persist creates and edits. Task data uses `little-magic.tasks.v1`; the note uses `little-magic.note.v1`. Records contain ID, title, completion, creation timestamp, optional description/date/time/reminder/priority/category/recurrence, and subtasks (ID/title/completion). Legacy records without description or creation timestamp still load.

- **Profile artwork:** the fourth navigation destination is the user profile and uses the authored `profile` asset.
- **Parent completion:** a confirmation sheet explains that unfinished subtasks remain incomplete. Cancel leaves the parent unchanged. Subtask completion is edited separately and committed with Save changes.
- **Storage failures:** failed task writes leave the editor open with its draft and an inline error; no in-memory task is presented as durably saved. Note writes retain their existing in-memory fallback. Both emit `little-magic:persistence-error`.
- **Routing:** Home filters by the local calendar day. Inbox filters for no due date. Future/past tasks remain persisted for future calendar views; they do not create extra Home sections. The current destination stays open after creation.
- **Composer scope:** the confirmed reference layout has a left Close action and right save checkmark, Task Title with a checkbox-style visual, exactly three detail rows (Description, Date and time, Reminder), then Sub-task and Add sub-task. No Priority, Category, Recurrence, Add Details disclosure, or bottom Cancel/submit action. Existing excluded properties are preserved when editing older tasks.
- **Reminders:** one local date/time value is saved; notification delivery/permissions remain undefined. Existing reminder text is preserved on edit unless explicitly replaced or removed.
- **Subtask scheduling:** date/time/reminder controls are deferred because the existing subtask model only supports title/completion.
- **Picker presentation:** Date and time and Reminder open focused secondary sheets with the existing platform-native picker controls. Apply commits to the composer draft; Close/Escape discards only the secondary edit and restores focus to its trigger. Reminders keep the single absolute local date/time model; no relative offsets are invented.
- **Sheet finish:** the composer and pickers float 16px from the side/bottom safe edges with 32px corners, the existing paper mask/texture, Level 2 elevation, and the approved `rgba(26, 15, 46, 0.40)` scrim. Only the active overlay supplies the scrim.
- **New file-backed artwork:** `Icon/description.svg` is provisional. `Icon/decorative/twig.svg`, `vine.svg`, and `sparkle.svg` are individual transparent SVGs with no baked backgrounds or shadows. `src/artwork.ts` references them with explicit `?no-inline` URLs in development and production. Edge decorations are non-interactive and hidden from assistive technology.
- **Approved text contrast:** placeholder `#8C8490` on `#FFFBFF` measures 3.52:1; completed metadata `#AAA2AD` on `#F6EBFE` measures 2.15:1. These supplied colors are retained. The accessibility requirement and these text-color assignments need review rather than an unapproved color substitution.

## Home-specific implementation choices

User authorization in the attached build instruction permits these technical derivations, without creating global design-system rules:

- The greeting was removed at the user's request; Today uses approved H2 typography and begins 32px after the note.
- Note counter sits 8px below writing. Note structural geometry uses 16px rounding; the authored paper mask supplies its visible contour.
- Navigation images fit inside a 32px artwork slot in the existing 40×32px indicator region, preserving aspect ratio and supplied pixels. SVG display viewports exclude transparent export margins; the source artwork is unchanged.
- Priority/metadata functional symbols use the approved 16px/1.5px stroke relationship; the FAB uses 24px/2px. These small functional SVGs are authored in code, not taken from an icon library. Navigation uses supplied artwork only.
- CSS stacking levels, SVG path coordinates, asset dimensions and storage keys are implementation details, not new global tokens.
- Bottom content clearance includes navigation, safe area, FAB, its 16px gap and the specified 24px separation. VisualViewport updates accommodate the actual software keyboard.

The approved scrim and new assets are documented in finishing.md, icons.md, and visual-language.md. The confirmed composer layout is recorded in create-task.md. Unrelated design-system decisions remain unchanged.
