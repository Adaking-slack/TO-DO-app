import { useEffect, useState } from 'react';
import { PersonalNote } from './PersonalNote';
import { InkIcon, TaskRow } from './TaskRow';
import { localDay, subscribe, taskRepository, type Task } from './storage';
import { requestAction, type Destination, type AppAction } from './actions';
import { TaskEditor } from './TaskEditor';
import { Sheet } from './Sheet';

// Display framing removes transparent export margins without altering the authored PNGs.
const iconFrames: Record<string, { viewBox: string; width: number; height: number }> = {
  home: { viewBox: '415 436 424 387', width: 1254, height: 1254 },
  inbox: { viewBox: '218 182 957 759', width: 1392, height: 1130 },
  calendar: { viewBox: '147 165 962 963', width: 1254, height: 1254 },
  profile: { viewBox: '98 21 1125 1183', width: 1278, height: 1230 },
};
const destinations: { name: Destination; icon?: string }[] = [
  { name: 'Home', icon: 'home' }, { name: 'Inbox', icon: 'inbox' },
  { name: 'Calendar', icon: 'calendar' }, { name: 'Profile', icon: 'profile' },
];
export function App() {
  const [tasks, setTasks] = useState(taskRepository.all);
  const [now, setNow] = useState(() => new Date());
  const [announcement, setAnnouncement] = useState('');
  const [destination, setDestination] = useState<'Home' | 'Inbox'>(() => location.pathname === '/inbox' ? 'Inbox' : 'Home');
  const [editor, setEditor] = useState<{ task?: Task } | null>(null);
  const [confirmTask, setConfirmTask] = useState<Task | null>(null);
  const [saveError, setSaveError] = useState('');
  useEffect(() => subscribe(() => setTasks(taskRepository.all())), []);
  useEffect(() => {
    const onAction = (event: Event) => {
      const action = (event as CustomEvent<AppAction>).detail;
      if (action.type === 'create-task') setEditor({});
      if (action.type === 'open-task') { const task = taskRepository.all().find(t => t.id === action.id); if (task) setEditor({ task }); }
      if (action.type === 'navigate' && (action.destination === 'Home' || action.destination === 'Inbox')) {
        setDestination(action.destination); history.pushState(null, '', action.destination === 'Home' ? '/' : '/inbox'); window.scrollTo({ top: 0 });
      }
      if (action.type === 'confirm-parent-completion') { setSaveError(''); setConfirmTask(taskRepository.all().find(t => t.id === action.id) ?? null); }
    };
    const onPop = () => setDestination(location.pathname === '/inbox' ? 'Inbox' : 'Home');
    window.addEventListener('little-magic:action', onAction); window.addEventListener('popstate', onPop);
    return () => { window.removeEventListener('little-magic:action', onAction); window.removeEventListener('popstate', onPop); };
  }, []);
  useEffect(() => {
    const tick = () => setNow(new Date()); const timer = window.setInterval(tick, 30_000);
    window.addEventListener('focus', tick); document.addEventListener('visibilitychange', tick);
    return () => { clearInterval(timer); window.removeEventListener('focus', tick); document.removeEventListener('visibilitychange', tick); };
  }, []);
  useEffect(() => {
    // Keep fixed controls above the actual mobile keyboard without a guessed keyboard height.
    const viewport = window.visualViewport;
    const update = () => document.documentElement.style.setProperty('--keyboard-inset', `${Math.max(0, window.innerHeight - (viewport?.height ?? window.innerHeight) - (viewport?.offsetTop ?? 0))}px`);
    update(); viewport?.addEventListener('resize', update); viewport?.addEventListener('scroll', update);
    return () => { viewport?.removeEventListener('resize', update); viewport?.removeEventListener('scroll', update); };
  }, []);
  const today = tasks.filter(t => t.date === localDay(now));
  const visibleTasks = destination === 'Home' ? today : tasks.filter(t => !t.date);
  const persistCompletion = (task: Task) => {
    try { taskRepository.upsert({ ...task, completed: !task.completed }); setSaveError(''); setConfirmTask(null); setAnnouncement(`${task.title} ${task.completed ? 'marked incomplete' : 'completed'}.`); }
    catch (error) { setSaveError(error instanceof Error ? error.message : 'Your task could not be saved.'); }
  };
  const toggle = (task: Task) => {
    if (!task.completed && task.subtasks?.some(s => !s.completed)) {
      requestAction({ type: 'confirm-parent-completion', id: task.id }); return;
    }
    persistCompletion(task);
  };
  return <>
    <main className="home" id="main-content">
      {destination === 'Home' && <header className="opening"><PersonalNote /></header>}
      <section className={destination === 'Home' ? 'today' : 'inbox'} aria-labelledby="today-heading">
        <h2 id="today-heading">{destination === 'Home' ? 'Today' : 'Inbox'} <span className="task-count">· {visibleTasks.length}</span></h2>
        {visibleTasks.length > 0 && <ul className="task-list">{visibleTasks.map(task => <TaskRow key={task.id} task={task} now={now} onToggle={toggle} />)}</ul>}
        {destination === 'Home' && today.length === 0 && <div className="empty-state">
          <img src="/assets/empty-home.png" alt="" width="1536" height="1024" />
          <h3>The page is yours</h3>
          <p>What would you like to make happen today?</p>
        </div>}
        {destination === 'Inbox' && !visibleTasks.length && <p className="inbox-hint">Tasks without a date will appear here. Tap + to create a task.</p>}
        {saveError && !confirmTask && <p className="field-error" role="alert">{saveError}</p>}
      </section>
    </main>
    <button className="fab paper" aria-label="Create task" onClick={() => requestAction({ type: 'create-task' })}>
      <span className="paper-surface" aria-hidden="true" /><InkIcon name="plus" />
    </button>
    <nav className="bottom-navigation paper" aria-label="Main navigation">
      <span className="paper-surface" aria-hidden="true" />
      <div className="navigation-items">{destinations.map(({ name, icon }) => <a key={name} href={name === 'Home' ? '/' : `/${name.toLowerCase()}`} aria-current={name === destination ? 'page' : undefined}
        onClick={e => { e.preventDefault(); requestAction({ type: 'navigate', destination: name }); }}>
        <span className="navigation-icon" aria-hidden="true">{icon && <svg viewBox={iconFrames[icon].viewBox} width="32" height="32" aria-hidden="true"><image href={`/assets/navigation/${icon}.png`} width={iconFrames[icon].width} height={iconFrames[icon].height} /></svg>}</span>
        <span>{name}</span>
      </a>)}</div>
    </nav>
    {editor && <TaskEditor task={editor.task} onClose={() => setEditor(null)} onSaved={task => { setEditor(null); setAnnouncement(`${task.title} saved${!task.date ? ' to Inbox' : task.date === localDay() ? ' for today' : ''}.`); }} />}
    {confirmTask && <Sheet title="Complete task?" onClose={() => setConfirmTask(null)}>
      <p className="confirmation-copy">“{confirmTask.title}” has unfinished subtasks. They will stay incomplete.</p>
      {saveError && <p className="field-error" role="alert">{saveError}</p>}
      <div className="sheet-actions"><button type="button" className="primary-button paper" onClick={() => persistCompletion(taskRepository.all().find(t => t.id === confirmTask.id) ?? confirmTask)}><span className="paper-surface" aria-hidden="true" />Complete task</button><button type="button" className="text-button" onClick={() => setConfirmTask(null)}>Cancel</button></div>
    </Sheet>}
    <div className="sr-only" role="status">{announcement}</div>
  </>;
}
