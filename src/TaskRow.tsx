import type { Task } from './storage';
import { requestAction } from './actions';

type SymbolName = 'plus' | 'check' | 'flag' | 'clock' | 'bell' | 'repeat' | 'tag';
const paths: Record<SymbolName, string> = {
  plus: 'M12.2 4.4Q11.7 12 12.1 19.7M4.4 12.1Q12 11.6 19.6 12',
  check: 'M5.1 12.2L9.7 17.2Q15 10.8 19 6.9',
  flag: 'M5.5 21L5.1 3.2Q9 1.8 13 4Q16 5.5 20 3.8L19.7 13.6Q16.5 15 13 13.1Q9.5 11.2 5.4 13',
  clock: 'M21 12A9 9 0 1 1 3 12A9 9 0 1 1 21 12M12 6.2L11.9 12.1L16 14.3',
  bell: 'M5 16.8Q7 15 7 10Q6.8 5 12 4.8Q17 5 17 10Q17 14.8 19 17L5 16.8M10 20Q12 22 14 20M12 3V4.8',
  repeat: 'M4 9Q5 4.5 10 5H19M16 2L19.5 5L16 8M20 15Q19 19.5 14 19H5M8 16L4.5 19L8 22',
  tag: 'M3 3.5L12 3L21 12L12 21L3 12Z M7 7h.1',
};
export function InkIcon({ name, className = '' }: { name: SymbolName; className?: string }) {
  return <svg className={`ink-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
export function TaskRow({ task, now, onToggle }: { task: Task; now: Date; onToggle: (task: Task) => void }) {
  const overdue = !task.completed && task.date && task.time && new Date(`${task.date}T${task.time}`).getTime() < now.getTime();
  const progress = task.subtasks?.length ? `${task.subtasks.filter(s => s.completed).length} of ${task.subtasks.length} subtasks` : '';
  const time = task.time ? new Date(`2000-01-01T${task.time}`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : '';
  return <li className={`task-row${task.completed ? ' completed' : ''}`}>
    <label className="completion-target">
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} aria-label={`${task.completed ? 'Uncomplete' : 'Complete'} ${task.title}`} />
      <span className="checkbox-art" aria-hidden="true">{task.completed && <InkIcon name="check" />}</span>
    </label>
    <button className="task-content" onClick={() => requestAction({ type: 'open-task', id: task.id })} aria-label={`Open task: ${task.title}`}>
      <span className="task-title">{task.title}{task.priority && <span className={`priority ${task.priority}`}><InkIcon name="flag" /><span className="sr-only"> {task.priority} priority</span></span>}</span>
      {(time || task.reminder || task.recurrence || task.category || task.inProgress || progress) && <span className="task-metadata">
        {time && <span className={overdue ? 'overdue' : ''}><InkIcon name="clock" />{time}{overdue ? ' · Overdue' : ''}</span>}
        {task.reminder && <span><InkIcon name="bell" />{task.reminder}</span>}
        {task.recurrence && <span><InkIcon name="repeat" />{task.recurrence}</span>}
        {task.category && <span><InkIcon name="tag" />{task.category}</span>}
        {task.inProgress && !task.completed && <span className="in-progress">In progress</span>}
        {progress && <span>{progress}</span>}
      </span>}
    </button>
  </li>;
}
