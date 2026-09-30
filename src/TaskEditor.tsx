import { useId, useLayoutEffect, useRef, useState, type FormEvent } from 'react';
import { InkIcon } from './TaskRow';
import { Sheet } from './Sheet';
import { taskRepository, type Task } from './storage';
import { normalizeTask, type TaskDraft } from './taskDraft';
import { Field, SchedulePicker, ReminderPicker, formatSchedule, formatReminder } from './TaskPickers';
import { artwork } from './artwork';

export function TaskEditor({ task, onClose, onSaved }: { task?: Task; onClose: () => void; onSaved: (task: Task) => void }) {
  const [draft, setDraft] = useState<TaskDraft>(() => task ? { ...task, subtasks: task.subtasks?.map(s => ({ ...s })) } : { title: '', completed: false, subtasks: [] });
  const [picker, setPicker] = useState<'schedule' | 'reminder' | null>(null);
  const [error, setError] = useState('');
  const [titleError, setTitleError] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null), descriptionRef = useRef<HTMLTextAreaElement>(null);
  const subtaskFields = useRef(new Map<string, HTMLInputElement>()), pendingFocus = useRef<string | null>(null);
  const addSubtaskButton = useRef<HTMLButtonElement>(null), submitting = useRef(false);
  const formId = useId();
  const update = <K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) => setDraft(d => ({ ...d, [key]: value }));
  useLayoutEffect(() => {
    const el = descriptionRef.current!;
    const grow = () => { el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px`; };
    grow(); const observer = new ResizeObserver(grow); observer.observe(el.parentElement!);
    return () => observer.disconnect();
  }, [draft.description]);
  useLayoutEffect(() => {
    if (pendingFocus.current) { subtaskFields.current.get(pendingFocus.current)?.focus(); pendingFocus.current = null; }
  }, [draft.subtasks?.length]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    if (!draft.title.trim()) { setTitleError(true); titleRef.current?.focus(); return; }
    submitting.current = true;
    try { const saved = normalizeTask(draft, task); taskRepository.upsert(saved); onSaved(saved); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Your task could not be saved. Please try again.'); submitting.current = false; }
  };
  const addSubtask = () => {
    const id = crypto.randomUUID(); pendingFocus.current = id;
    update('subtasks', [...draft.subtasks ?? [], { id, title: '', completed: false }]);
  };
  return <>
    <Sheet title={task ? 'Task details' : 'Create Task'} floating decorated covered={Boolean(picker)} onClose={onClose}
      actions={<button className="primary-button paper save-task" type="submit" form={formId} aria-label={task ? 'Save changes' : 'Create Task'}><span className="paper-surface" aria-hidden="true" /><InkIcon name="check" /></button>}>
      <form id={formId} className="task-composer" onSubmit={submit} noValidate>
        <div className="task-main-group"><Field label="Task title" id="task-title">
          <div className={`title-input${titleError ? ' invalid' : ''}`}><span className="checkbox-art" aria-hidden="true" />
            <input ref={titleRef} autoFocus id="task-title" required placeholder="Task title" value={draft.title}
              aria-invalid={titleError || undefined} aria-describedby={titleError ? 'title-error' : undefined}
              onChange={e => { update('title', e.target.value); if (e.target.value.trim()) setTitleError(false); }} />
          </div>
          {titleError && <p className="field-error" id="title-error">Enter a task title.</p>}
        </Field>
        <div className="task-details-group" role="group" aria-label="Task details">
          <div className="description-row"><img className="description-icon" src={artwork.description} alt="" aria-hidden="true" />
            <Field label="Description" id="description"><textarea ref={descriptionRef} id="description" rows={1} className="form-input" value={draft.description ?? ''} placeholder="Description" onChange={e => update('description', e.target.value)} /></Field>
          </div>
          <button type="button" className="detail-trigger" aria-label="Date and time" aria-haspopup="dialog" aria-describedby={draft.date ? 'schedule-summary' : undefined} onClick={() => setPicker('schedule')}>
            <InkIcon name="calendar" /><span>Date and time{draft.date && <span className="detail-value" id="schedule-summary">{formatSchedule(draft.date, draft.time)}</span>}</span><InkIcon name="chevron" />
          </button>
          <button type="button" className="detail-trigger" aria-label="Reminder" aria-haspopup="dialog" aria-describedby={draft.reminder ? 'reminder-summary' : undefined} onClick={() => setPicker('reminder')}>
            <InkIcon name="bell" /><span>Reminder{draft.reminder && <span className="detail-value" id="reminder-summary">{formatReminder(draft.reminder)}</span>}</span><InkIcon name="chevron" />
          </button>
        </div>
        </div>
        <section className="composer-subtasks" aria-labelledby="subtask-heading"><h3 id="subtask-heading">Sub-task</h3>
          <button ref={addSubtaskButton} type="button" className="secondary-button paper" onClick={addSubtask}><span className="paper-surface" aria-hidden="true" /><InkIcon name="plus" />Add sub-task</button>
          {Boolean(draft.subtasks?.length) && <div className="subtask-editor-list">{draft.subtasks!.map((subtask, index) => <div className="subtask-editor" key={subtask.id}>
            {task ? <label className="completion-target"><input type="checkbox" checked={subtask.completed} aria-label={`${subtask.completed ? 'Uncomplete' : 'Complete'} subtask: ${subtask.title}`} onChange={e => update('subtasks', draft.subtasks!.map(s => s.id === subtask.id ? { ...s, completed: e.target.checked } : s))} /><span className="checkbox-art" aria-hidden="true">{subtask.completed && <InkIcon name="check" />}</span></label> : <span className="draft-checkbox" aria-hidden="true"><span className="checkbox-art" /></span>}
            <label className="sr-only" htmlFor={`subtask-${subtask.id}`}>Sub-task {index + 1}</label>
            <input ref={el => { if (el) subtaskFields.current.set(subtask.id, el); else subtaskFields.current.delete(subtask.id); }} className={`form-input${subtask.completed ? ' subtask-completed' : ''}`} id={`subtask-${subtask.id}`} placeholder="Sub-task title" value={subtask.title} onChange={e => update('subtasks', draft.subtasks!.map(s => s.id === subtask.id ? { ...s, title: e.target.value } : s))} />
            <button type="button" className="text-button" aria-label={`Remove sub-task ${index + 1}`} onClick={() => { update('subtasks', draft.subtasks!.filter(s => s.id !== subtask.id)); addSubtaskButton.current?.focus(); }}>Remove</button>
          </div>)}</div>}
        </section>
        {error && <p role="alert" className="field-error">{error}</p>}
      </form>
    </Sheet>
    {picker === 'schedule' && <SchedulePicker date={draft.date} time={draft.time} onClose={() => setPicker(null)} onApply={(date, time) => { setDraft(d => ({ ...d, date: date || undefined, time: time || undefined })); setPicker(null); }} />}
    {picker === 'reminder' && <ReminderPicker reminder={draft.reminder} onClose={() => setPicker(null)} onApply={reminder => { update('reminder', reminder || undefined); setPicker(null); }} />}
  </>;
}
