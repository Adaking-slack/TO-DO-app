import { useEffect, useState } from 'react';
import { PersonalNote } from './PersonalNote';
import { InkIcon, TaskRow } from './TaskRow';
import { localDay, subscribe, taskRepository, type Task } from './storage';
import { requestAction, type Destination } from './actions';

// Display framing removes transparent export margins without altering the authored PNGs.
const iconFrames: Record<string, { viewBox: string; width: number; height: number }> = {
  home: { viewBox: '415 436 424 387', width: 1254, height: 1254 },
  inbox: { viewBox: '218 182 957 759', width: 1392, height: 1130 },
  calendar: { viewBox: '147 165 962 963', width: 1254, height: 1254 },
};
const destinations: { name: Destination; icon?: string }[] = [
  { name: 'Home', icon: 'home' }, { name: 'Inbox', icon: 'inbox' },
  { name: 'Calendar', icon: 'calendar' }, { name: 'Projects' },
];
export function App() {
  const [tasks, setTasks] = useState(taskRepository.all);
  const [now, setNow] = useState(() => new Date());
  const [announcement, setAnnouncement] = useState('');
  useEffect(() => subscribe(() => setTasks(taskRepository.all())), []);
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
  const toggle = (task: Task) => {
    if (!task.completed && task.subtasks?.some(s => !s.completed)) {
      requestAction({ type: 'confirm-parent-completion', id: task.id }); return;
    }
    taskRepository.upsert({ ...task, completed: !task.completed });
    setAnnouncement(`${task.title} ${task.completed ? 'marked incomplete' : 'completed'}.`);
  };
  return <>
    <main className="home" id="main-content">
      <header className="opening"><h1>A little magic, one task at a time.</h1><PersonalNote /></header>
      <section className="today" aria-labelledby="today-heading">
        <h2 id="today-heading">Today <span className="task-count">· {today.length}</span></h2>
        {today.length > 0 && <ul className="task-list">{today.map(task => <TaskRow key={task.id} task={task} now={now} onToggle={toggle} />)}</ul>}
      </section>
    </main>
    <button className="fab paper" aria-label="Create task" onClick={() => requestAction({ type: 'create-task' })}>
      <span className="paper-surface" aria-hidden="true" /><InkIcon name="plus" />
    </button>
    <nav className="bottom-navigation paper" aria-label="Main navigation">
      <span className="paper-surface" aria-hidden="true" />
      <div className="navigation-items">{destinations.map(({ name, icon }) => <a key={name} href={name === 'Home' ? '/' : `/${name.toLowerCase()}`} aria-current={name === 'Home' ? 'page' : undefined}
        onClick={e => { e.preventDefault(); if (name === 'Home') window.scrollTo({ top: 0 }); else requestAction({ type: 'navigate', destination: name }); }}>
        <span className="navigation-icon" aria-hidden="true">{icon && <svg viewBox={iconFrames[icon].viewBox} width="32" height="32" aria-hidden="true"><image href={`/assets/navigation/${icon}.png`} width={iconFrames[icon].width} height={iconFrames[icon].height} /></svg>}</span>
        <span>{name}</span>
      </a>)}</div>
    </nav>
    <div className="sr-only" role="status">{announcement}</div>
  </>;
}
