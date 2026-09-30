# Product Requirements Document — Witch-Themed To-Do App

## 1. Document Purpose

This PRD introduces Codex to the mobile product being designed and built. It defines the current product scope, product principles, implementation expectations, and—most importantly—the relationship between implementation and the project's evolving Markdown specifications.

This is a living product specification. Screen design, implementation, and design-system development will continue in parallel.

Codex must not treat this PRD as the only source of truth. The modular Markdown specification files in the project contain the approved design-system rules and must be consulted during implementation.

---

## 2. Product Overview

The product is a **mobile-only to-do and personal planning application** that helps users capture, organize, schedule, and complete the things they need to do.

Users should be able to move from simple task capture to more structured planning when needed. A task may remain a simple item or gain scheduling, reminders, priority, categorization, and subtasks.

The product also supports **events and goals**, allowing planning to extend beyond isolated to-do items.

Its interface combines practical modern productivity patterns with a distinctive witch-inspired storybook visual language. The magical identity should add personality without obscuring familiar interactions.

---

## 3. Product Vision

Create a task-management experience that combines:

- Practical everyday planning
- Clear task organization
- Flexible scheduling
- Goal management
- A distinctive storybook/witch-inspired identity
- Modern mobile interaction patterns
- Selective moments of expressive magic

The visual principle is:

> **Storybook foundation + modern UI structure + selective experimental magic.**

Magic should be concentrated at meaningful moments rather than applied indiscriminately to every control.

---

## 4. Core Product Capabilities

### Task Management
Users can:
- Create tasks
- View tasks
- Edit tasks
- Delete tasks
- Complete tasks
- Manage completed tasks

### Scheduling
Users can:
- Schedule tasks
- Reschedule tasks
- Associate dates with tasks
- Associate times with tasks where appropriate

### Reminders
Users can:
- Set reminders
- Modify reminders
- Remove reminders

Exact notification permissions, reminder delivery, recurrence, and notification architecture remain to be defined.

### Subtasks
Users can:
- Add subtasks to a parent task
- Manage subtasks
- Complete subtasks

The relationship between parent and child items must remain visually and behaviorally clear.

### Priority
Users can assign priority to tasks.

Approved task-priority colors:
- High: `#762323`
- Medium: `#766A23`
- Low: `#233676`

These colors do not by themselves define the final priority UI. Task-specific presentation belongs in the relevant component specification.

### Categorization
Users can categorize tasks.

The category model, creation flow, colors, filtering behavior, and management experience are not yet globally defined. Codex must not invent them.

### Events
Users can create and manage events.

The exact distinction between an event and a scheduled task, event-specific fields, duration, recurrence, and calendar behavior will be defined as the product evolves.

### Goals
Users can create, manage, and complete goals.

The exact relationship between goals and tasks, progress measurement, scheduling, and goal-specific components will be defined as relevant flows are designed.

---

## 5. Current Product Model

### Task
An actionable item the user intends to complete.

A task may eventually contain attributes such as:
- Title
- Completion state
- Schedule
- Reminder
- Priority
- Category
- Subtasks

This is product capability, not a finalized database schema. Do not assume every task requires every attribute.

### Subtask
A subordinate actionable item associated with a parent task.

### Event
A time-related planning item. Its final data model remains undefined.

### Goal
A higher-level item representing something the user wants to accomplish. Its final model and relationship to tasks remain undefined.

### Category
A mechanism for organizing relevant product items. Its final structure remains undefined.

---

## 6. Product Principles

### Simple actions remain simple
Creating a basic task should not require configuring every advanced property.

### Progressive complexity
Quick capture and richer planning should coexist without making every interaction equally complex.

### Familiar functionality, distinctive expression
Common productivity concepts remain recognizable. Do not replace familiar functional meanings with obscure magical metaphors merely to reinforce the theme.

### Visual identity must not reduce usability
Storybook shapes, paper textures, ornaments, illustrations, and magical motifs are presentation layers around a usable modern interface. Functional geometry, touch targets, hierarchy, accessibility, and readability take priority.

### Do not over-containerize
Not every content group requires a card. Follow the project's layout and card specifications.

### Mobile only
The current product is designed for mobile. Do not introduce desktop layouts, desktop navigation, or desktop breakpoints unless product scope explicitly changes.

---

## 7. Visual Direction

The detailed visual language is already defined in the project's Markdown specifications. Codex must not recreate or independently replace it from this PRD.

Current high-level direction:
- Witch-inspired
- Hand-drawn storybook illustration
- Modern UI structure
- Organic paper-cut surfaces
- Controlled irregularity
- Light paper/handmade texture
- Selective magical ornamentation
- Expressive moments balanced with calm functional screens
- Lora typography
- Purple-led brand system
- Familiar functional iconography redrawn in a hand-drawn style

Consult the Markdown files for exact approved rules.

---

## 8. Markdown Specifications Are the Design Source of Truth

Current specifications include:

- `Colors.md`
- `typography.md`
- `interface-craft.md`
- `spacing.md`
- `visual-language.md`
- `radius.md`
- `layout.md`
- `icons.md`
- `buttons.md`
- `inputs.md`
- `cards.md`

Additional specifications will be created as development progresses, including areas such as:
- Task components
- Navigation
- Elevation
- Motion
- Feedback
- Illustration
- Accessibility
- Content

### Source-of-truth rule

For visual, interaction, component, layout, or design-system decisions, **the relevant Markdown specification is authoritative**.

If this PRD and a more specific design-system file appear to conflict on a design detail, use the more specific and most recently approved specification.

Do not silently reconcile genuine conflicts by inventing a third interpretation. Flag the contradiction.

---

## 9. Continuous Specification Sync

The Markdown specifications are living files and will change during development.

Before implementing or materially modifying a screen or component, Codex must:

1. Identify the relevant Markdown specifications.
2. Read their current versions.
3. Apply their current approved rules.
4. Not rely solely on rules remembered from an earlier implementation session.
5. Check for relevant specification changes before extending existing work.
6. Apply newer rules to affected implementation where relevant.
7. Never overwrite newer design decisions with older implementation assumptions.

A change to one specification does not justify unrelated changes elsewhere.

---

## 10. Undefined-Value Protocol

> **Do not invent undefined design-system decisions.**

When implementation requires a value or behavior:

1. Check the relevant Markdown files.
2. If an applicable rule exists, use it automatically.
3. If no applicable rule exists, identify the exact missing decision.
4. Do not silently substitute framework defaults, arbitrary colors, spacing, radii, shadows, animations, variants, silhouettes, icons, or navigation patterns.
5. Surface the missing decision to the user.
6. Wait for the user to define it or explicitly authorize derivation.
7. If derivation is authorized, derive only that requested decision or group.
8. Do not turn a one-off screen decision into a global system rule without approval.

Always check existing specifications before requesting a new decision.

---

## 11. Screen Design and System Design Work in Parallel

A screen may reveal that a new reusable component or rule is required.

When that happens:
- Do not improvise a permanent system rule inside the screen.
- Identify the missing system decision.
- Allow the relevant Markdown specification to be created or updated.
- Implement the approved rule afterward.

A screen-specific solution remains screen-specific unless deliberately promoted into the reusable system.

The design system should evolve from real product requirements rather than attempting to predict every future component before building begins.

---

## 12. Important Existing Structural Rules

These are summaries only. Consult the relevant files for complete requirements.

### Layout
- Mobile vertical flow
- 16px horizontal screen padding
- Content scrolls vertically by default
- No horizontal scrolling for core task content
- No universal screen-content template
- Decoration may visually escape boundaries but must not disrupt functional layout or obscure controls

### Shape
- Functional geometry remains precise
- Organic paper-cut character is a visual layer
- Do not invent arbitrary radii to simulate handmade shapes
- Do not randomly distort components at runtime

### Cards
- Cards are not mandatory containers
- Standard cards remain calmer than expressive feature surfaces
- Product-specific cards inherit the general card system

### Inputs
- Inputs remain restrained functional controls
- Decoration must not interfere with data entry or selection
- Familiar picker/search behavior remains recognizable

### Buttons
Approved foundational categories:
- Primary
- Secondary
- Tertiary/Text
- Destructive
- Icon-only

Do not create additional global button categories without approval.

### Icons
- Functional icons retain recognizable meanings
- Use the approved hand-drawn language
- Illustrated/product icons may use richer illustration colors
- Illustration colors do not automatically become UI tokens

---

## 13. Task State Foundation

Existing task-related semantic colors include:

- Completed task: `#237635`
- Overdue task: `#762323`
- In-progress task: `#233676`
- Checkbox unchecked: `#686464`
- Checkbox checked: `#237635`
- Checkbox checkmark: `#FFFFFF`

These colors do not define complete task-state presentation.

Task-specific composition and state behavior must follow `task-components.md` once defined.

Important states must not rely on color alone.

---

## 14. Accessibility

Accessibility is a product requirement.

Implementation should preserve:
- Readable typography
- Sufficient contrast
- Adequate touch targets
- Visible focus where applicable
- Accessible names for icon-only controls
- Meaningful input labels
- Non-color cues for important states
- Reduced-motion support where motion is used
- Semantic controls and native behavior where appropriate

The dedicated accessibility specification, once created, becomes authoritative for additional accessibility requirements.

---

## 15. Implementation Expectations for Codex

Codex should:

- Work from this PRD and the current relevant Markdown specifications.
- Inspect existing implementation before replacing established patterns.
- Reuse approved tokens and components.
- Avoid duplicating design tokens locally inside screens.
- Avoid hard-coding new design values where a system rule should exist.
- Keep reusable components reusable.
- Preserve mobile adaptability across phone sizes.
- Let content grow naturally instead of matching mockups through brittle fixed heights.
- Keep functional hit areas predictable even when visible shapes are organic.
- Separate decorative artwork from interaction geometry.
- Avoid random visual variation as a substitute for authored handmade assets.
- Keep implementation aligned with the most recent approved specifications.
- Never assume a partially designed screen represents the final product information architecture.

---

## 16. Intentionally Undefined / Evolving Areas

Do not guess these areas simply because implementation reaches them:

- Exact screen inventory
- Exact Home-screen composition
- Navigation model and appearance
- Task component composition
- Event data model and detailed behavior
- Goal data model and detailed behavior
- Category-management model
- Recurring-task behavior
- Reminder/notification architecture
- Date/time picker presentation
- Exact elevation values
- Exact motion system
- Feedback/toast/snackbar system
- Final illustration asset family
- Final reusable paper-cut silhouette assets
- Focus-ring geometry
- Detailed accessibility specification
- Content/voice guidelines
- Exact information architecture
- Backend architecture and persistence strategy unless separately specified
- Authentication/account model unless separately specified

Absence from this PRD is not permission to invent these systems.

---

## 17. Development Approach

The product is intentionally developed through:

**Define → Design → Build → Review → Identify missing rules → Update specification → Continue**

For a screen or flow:

1. Establish what it needs to accomplish.
2. Check the relevant current Markdown specifications.
3. Identify genuinely undefined requirements.
4. Resolve necessary design-system decisions.
5. Design and implement.
6. Review behavior and visual consistency.
7. Update reusable specifications when an approved reusable rule emerges.
8. Continue to the next screen or flow.

Do not delay all implementation until the entire design system is theoretically complete.

Do not bypass the design system because implementation has begun.

---

## 18. Current Success Definition

At this stage, success means creating a mobile planning application in which users can reliably manage tasks, schedules, reminders, events, subtasks, priorities, categories, and goals through a coherent and distinctive interface.

The application should feel:
- Useful
- Understandable
- Cohesive
- Tactile
- Whimsical
- Storybook-inspired
- Intentionally designed

The theme should make the product memorable; its utility should make it worth returning to.

---

## 19. Standing Instruction to Codex

Treat this project as an evolving product, not a static mockup implementation.

**Before building, read the relevant current Markdown specifications.**

**Before inventing, check whether the decision has already been defined.**

**When something genuinely remains undefined, surface it instead of silently deciding it.**

**When specifications change, use the updated rules in subsequent work and revise affected implementation where relevant.**

The Markdown files are the evolving design-system source of truth. This PRD provides the product context in which those rules should be applied.
