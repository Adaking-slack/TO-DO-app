export interface Task {
  id: string; title: string; completed: boolean; date?: string; time?: string;
  priority?: 'high' | 'medium' | 'low'; inProgress?: boolean;
  reminder?: string; recurrence?: string; category?: string;
  subtasks?: { id: string; title: string; completed: boolean }[];
}
export const keys = { note: 'little-magic.note.v1', tasks: 'little-magic.tasks.v1' };
const changed = 'little-magic:storage';
const memory = new Map<string, unknown>();
export function read<T>(key: string, fallback: T, valid: (v: unknown) => v is T): T {
  if (memory.has(key)) return memory.get(key) as T;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const value: unknown = JSON.parse(raw);
    return valid(value) ? value : fallback;
  } catch { return fallback; }
}
export function write<T>(key: string, value: T) {
  memory.set(key, value);
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch (error) {
    // TODO: connect approved persistence-failure feedback. Keep unsaved content in memory.
    window.dispatchEvent(new CustomEvent('little-magic:persistence-error', { detail: { key, error } }));
  }
  window.dispatchEvent(new Event(changed));
}
export function subscribe(listener: () => void) {
  const external = (e: StorageEvent) => { if (e.key) memory.delete(e.key); else memory.clear(); listener(); };
  window.addEventListener(changed, listener); window.addEventListener('storage', external);
  return () => { window.removeEventListener(changed, listener); window.removeEventListener('storage', external); };
}
const optionalString = (v: unknown) => v === undefined || typeof v === 'string';
export const validTasks = (v: unknown): v is Task[] => Array.isArray(v) && v.every(t =>
  t && typeof t.id === 'string' && typeof t.title === 'string' && typeof t.completed === 'boolean' &&
  [t.date, t.time, t.reminder, t.recurrence, t.category].every(optionalString) &&
  (t.priority === undefined || ['high', 'medium', 'low'].includes(t.priority)) &&
  (t.inProgress === undefined || typeof t.inProgress === 'boolean') &&
  (t.subtasks === undefined || Array.isArray(t.subtasks) && t.subtasks.every((s: Task) => s && typeof s.id === 'string' && typeof s.title === 'string' && typeof s.completed === 'boolean')));
export const taskRepository = {
  all: () => read<Task[]>(keys.tasks, [], validTasks),
  save(tasks: Task[]) { if (!validTasks(tasks)) throw new Error('Invalid task data'); write(keys.tasks, tasks); },
  upsert(task: Task) { const tasks = [...this.all()]; const i = tasks.findIndex(t => t.id === task.id); if (i < 0) tasks.push(task); else tasks[i] = task; this.save(tasks); },
};
export function localDay(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
