import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { InkIcon, type SymbolName } from './TaskRow';
import { Sheet } from './Sheet';
import { taskRepository, type Task } from './storage';
import { normalizeTask, type TaskDraft } from './taskDraft';

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return <div className="form-field"><label htmlFor={id}>{label}</label>{children}</div>;
}
function Picker({ label, id, type, value, onChange, disabled = false }: {
  label: string; id: string; type: 'date' | 'time' | 'datetime-local'; value: string; onChange: (value: string) => void; disabled?: boolean;
}) {
  const icon = type === 'date' ? 'calendar' : type === 'time' ? 'clock' : 'bell';
  const formatted = !value ? `Choose ${label.toLowerCase()}` : type === 'date' ? new Date(`${value}T12:00`).toLocaleDateString(undefined, { dateStyle: 'medium' }) : type === 'time' ? new Date(`2000-01-01T${value}`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  return <Field label={label} id={id}>
    <div className={`picker-field${disabled ? ' disabled' : ''}`}>
      <InkIcon name={icon} /><span className={value ? '' : 'field-placeholder'}>{formatted}</span><InkIcon name="chevron" />
      <input id={id} type={type} value={value} disabled={disabled} onChange={e => onChange(e.target.value)} onClick={e => { try { e.currentTarget.showPicker(); } catch { /* The native input remains the fallback. */ } }} />
    </div>
    {value && <button className="text-button clear-field" type="button" onClick={() => onChange('')}>Remove {label.toLowerCase()}</button>}
  </Field>;
}
function Choice({ id, label, icon, value, values, onChange }: { id: string; label: string; icon: SymbolName; value?: string; values: string[]; onChange: (value: string) => void }) {
  return <Field label={label} id={id}><div className="select-field"><InkIcon name={icon} className={id === 'priority' ? value : ''} />
    <select id={id} value={value ?? ''} onChange={e => onChange(e.target.value)}><option value="">None</option>{values.map(v => <option key={v} value={v}>{v[0].toUpperCase() + v.slice(1)}</option>)}</select><InkIcon name="chevron" />
  </div></Field>;
}

export function TaskEditor({ task, onClose, onSaved }: { task?: Task; onClose: () => void; onSaved: (task: Task) => void }) {
  const [draft, setDraft] = useState<TaskDraft>(() => task ? { ...task, subtasks: task.subtasks?.map(s => ({ ...s })) } : { title: '', completed: false, subtasks: [] });
  const [expanded, setExpanded] = useState(Boolean(task));
  const [error, setError] = useState('');
  const [titleError, setTitleError] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null), descriptionRef = useRef<HTMLTextAreaElement>(null);
  const submitting = useRef(false);
  const update = <K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) => setDraft(d => ({ ...d, [key]: value }));
  const available = (key: 'category' | 'recurrence') => [...new Set(taskRepository.all().map(t => t[key]).filter((v): v is string => Boolean(v)))];
  useLayoutEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;
    const grow = () => { el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px`; };
    grow(); const observer = new ResizeObserver(grow); observer.observe(el.parentElement!);
    return () => observer.disconnect();
  }, [draft.description, expanded]);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    if (!draft.title.trim()) { setTitleError(true); titleRef.current?.focus(); return; }
    submitting.current = true;
    try { const saved = normalizeTask(draft, task); taskRepository.upsert(saved); onSaved(saved); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Your task could not be saved. Please try again.'); submitting.current = false; }
  };
  return <Sheet title={task ? 'Task details' : 'Create Task'} onClose={onClose}>
    <form onSubmit={submit} noValidate>
      <Field label="Task title" id="task-title"><input ref={titleRef} autoFocus className="form-input" id="task-title" required placeholder="What do you want to do?" value={draft.title}
        aria-invalid={titleError || undefined} aria-describedby={titleError ? 'title-error' : undefined}
        onChange={e => { update('title', e.target.value); if (e.target.value.trim()) setTitleError(false); }} />
        {titleError && <p className="field-error" id="title-error">Enter a task title.</p>}
      </Field>
      <button type="button" className="text-button disclosure" aria-expanded={expanded} aria-controls="task-options" onClick={() => setExpanded(!expanded)}><InkIcon name="plus" />{expanded ? 'Hide details' : 'Add details'}</button>
      {expanded && <div className="editor-options" id="task-options">
        <section className="form-section" aria-label="Task details">
          <Field label="Description" id="description"><textarea ref={descriptionRef} id="description" rows={1} className="form-input" value={draft.description ?? ''} placeholder="Add a little more detail" onChange={e => update('description', e.target.value)} /></Field>
          <Picker id="due-date" label="Due date" type="date" value={draft.date ?? ''} onChange={date => setDraft(d => ({ ...d, date, time: date ? d.time : undefined }))} />
          <Picker id="due-time" label="Due time" type="time" value={draft.time ?? ''} disabled={!draft.date} onChange={v => update('time', v)} />
          {!draft.date && <p className="field-hint">Choose a date to add a time.</p>}
          <Picker id="reminder" label="Reminder" type="datetime-local" value={draft.reminder?.match(/^\d{4}-\d{2}-\d{2}T/) ? draft.reminder : ''} onChange={v => update('reminder', v)} />
          {draft.reminder && !draft.reminder.match(/^\d{4}-\d{2}-\d{2}T/) && <p className="field-hint">Current reminder: {draft.reminder} <button type="button" className="text-button" onClick={() => update('reminder', undefined)}>Remove reminder</button></p>}
          <p className="field-hint">Reminders are saved with your task. Notifications are not available yet.</p>
          <Choice id="priority" label="Priority" icon="flag" value={draft.priority} values={['high', 'medium', 'low']} onChange={v => update('priority', (v || undefined) as Task['priority'])} />
          <Choice id="category" label="Category" icon="tag" value={draft.category} values={available('category')} onChange={v => update('category', v)} />
          {!available('category').length && <p className="field-hint">No categories are available yet.</p>}
          <Choice id="recurrence" label="Recurrence" icon="repeat" value={draft.recurrence} values={available('recurrence')} onChange={v => update('recurrence', v)} />
          <p className="field-hint">{available('recurrence').length ? 'Repeat labels are saved; repeating tasks are not generated yet.' : 'No repeat options are available yet.'}</p>
        </section>
        <section className="form-section" aria-labelledby="subtask-heading"><h3 id="subtask-heading">Subtasks</h3>
          <div className="subtask-editor-list">{draft.subtasks?.map((subtask, index) => <div className="subtask-editor" key={subtask.id}>
            {task && <label className="completion-target"><input type="checkbox" checked={subtask.completed} aria-label={`${subtask.completed ? 'Uncomplete' : 'Complete'} subtask: ${subtask.title}`} onChange={e => update('subtasks', draft.subtasks!.map(s => s.id === subtask.id ? { ...s, completed: e.target.checked } : s))} /><span className="checkbox-art" aria-hidden="true">{subtask.completed && <InkIcon name="check" />}</span></label>}
            <Field label={`Subtask ${index + 1}`} id={`subtask-${subtask.id}`}><input className={`form-input${subtask.completed ? ' subtask-completed' : ''}`} id={`subtask-${subtask.id}`} placeholder="What needs to be done?" value={subtask.title} onChange={e => update('subtasks', draft.subtasks!.map(s => s.id === subtask.id ? { ...s, title: e.target.value } : s))} /></Field>
            <button type="button" className="text-button" aria-label={`Remove subtask ${index + 1}`} onClick={() => update('subtasks', draft.subtasks!.filter(s => s.id !== subtask.id))}>Remove</button>
          </div>)}</div>
          <button type="button" className="text-button" onClick={() => update('subtasks', [...draft.subtasks ?? [], { id: crypto.randomUUID(), title: '', completed: false }])}><InkIcon name="plus" />Add subtask</button>
        </section>
      </div>}
      {error && <p role="alert" className="field-error">{error}</p>}
      <div className="sheet-actions"><button className="primary-button paper" type="submit"><span className="paper-surface" aria-hidden="true" />{task ? 'Save changes' : 'Create Task'}</button><button type="button" className="text-button" onClick={onClose}>Cancel</button></div>
    </form>
  </Sheet>;
}
