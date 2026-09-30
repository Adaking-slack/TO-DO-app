import { useLayoutEffect, useRef, type ReactNode } from 'react';

export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const element = dialog.current!;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    const viewport = window.visualViewport;
    const resize = () => {
      element.style.setProperty('--sheet-height', `${viewport?.height ?? window.innerHeight}px`);
      element.style.setProperty('--sheet-bottom', `${Math.max(0, window.innerHeight - (viewport?.height ?? window.innerHeight) - (viewport?.offsetTop ?? 0))}px`);
    };
    resize(); viewport?.addEventListener('resize', resize); viewport?.addEventListener('scroll', resize);
    return () => {
      viewport?.removeEventListener('resize', resize); viewport?.removeEventListener('scroll', resize);
      element.close(); document.body.style.overflow = overflow; previous?.focus();
    };
  }, []);
  return <dialog ref={dialog} className="task-sheet paper" aria-labelledby="sheet-title" onCancel={e => { e.preventDefault(); onClose(); }}>
    <span className="paper-surface" aria-hidden="true" />
    <header className="sheet-heading"><h2 id="sheet-title">{title}</h2><button type="button" className="text-button" onClick={onClose}>Close</button></header>
    {children}
  </dialog>;
}
