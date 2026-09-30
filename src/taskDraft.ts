import type { Task } from './storage';

export type TaskDraft = Omit<Task, 'id' | 'createdAt'>;
export function normalizeTask(draft: TaskDraft, existing?: Task): Task {
  const title = draft.title.trim();
  if (!title) throw new Error('Enter a task title.');
  const clean = (value?: string) => value?.trim() || undefined;
  const date = clean(draft.date);
  return {
    ...existing, id: existing?.id ?? crypto.randomUUID(),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    title, completed: draft.completed, description: clean(draft.description),
    date, time: date ? clean(draft.time) : undefined,
    reminder: clean(draft.reminder), priority: draft.priority,
    category: clean(draft.category), recurrence: clean(draft.recurrence),
    subtasks: draft.subtasks?.filter(s => s.title.trim()).map(s => ({ ...s, title: s.title.trim() })),
  };
}
