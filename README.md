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

`src/actions.ts` dispatches the typed `little-magic:action` event. Create Task, task details, Inbox, Calendar and Projects intentionally have no invented destination UI. Attach future approved routes at this boundary. Home remains the active screen until these destinations are implemented.

Use `taskRepository.upsert(task)` / `.save(tasks)` to connect the future creation flow. Task data uses `little-magic.tasks.v1`; the note uses `little-magic.note.v1`. This is an implementation storage contract, not a finalized product database schema.

- **Projects artwork:** the only fourth source asset is named `profile` and depicts a person. It is not silently repurposed as Projects. Its icon slot is reserved, without a generated replacement; supply/identify the intended Projects asset.
- **Parent completion confirmation:** tasks with unfinished subtasks emit `confirm-parent-completion` without changing completion. Connect the approved confirmation experience before allowing that transition.
- **Storage failures:** unsaved data is retained in memory and a `little-magic:persistence-error` event is emitted. The visible failure/retry experience remains undefined; no success claim or invented toast is shown.
- Task creation/details and non-Home destination designs remain future screen work as instructed.
- **Approved text contrast:** placeholder `#8C8490` on `#FFFBFF` measures 3.52:1; completed metadata `#AAA2AD` on `#F6EBFE` measures 2.15:1. These supplied colors are retained. The accessibility requirement and these text-color assignments need review rather than an unapproved color substitution.

## Home-specific implementation choices

User authorization in the attached build instruction permits these technical derivations, without creating global design-system rules:

- Greeting and Today use approved H2 typography (semantic h1/h2 respectively).
- Greeting-to-note uses the approved 16px related-group spacing; Today begins 32px after the opening group.
- Note counter sits 8px below writing. Note structural geometry uses 16px rounding; the authored paper mask supplies its visible contour.
- Navigation images fit inside a 32px artwork slot in the existing 40×32px indicator region, preserving aspect ratio and supplied pixels. SVG display viewports exclude transparent export margins; the source artwork is unchanged.
- Priority/metadata functional symbols use the approved 16px/1.5px stroke relationship; the FAB uses 24px/2px. These small functional SVGs are authored in code, not taken from an icon library. Navigation uses supplied artwork only.
- CSS stacking levels, SVG path coordinates, asset dimensions and storage keys are implementation details, not new global tokens.
- Bottom content clearance includes navigation, safe area, FAB, its 16px gap and the specified 24px separation. VisualViewport updates accommodate the actual software keyboard.

Existing specifications were not rewritten as part of this implementation. Component-specific files and finishing/elevation rules supersede stale statements that those areas are undefined in older general files.
