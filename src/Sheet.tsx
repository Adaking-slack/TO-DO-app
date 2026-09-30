import { useId, useLayoutEffect, useRef, type ReactNode } from 'react';


export function Sheet({ title, onClose, children, actions, floating = false, decorated = false, covered = false }: {
  title: string; onClose: () => void; children: ReactNode; actions?: ReactNode; floating?: boolean; decorated?: boolean; covered?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  useLayoutEffect(() => {
    const element = dialog.current!;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    const viewport = window.visualViewport;
    let frame = 0;
    const keepFocusVisible = () => {
      const active = document.activeElement;
      const scroll = element.querySelector<HTMLElement>('.sheet-body') ?? element;
      if (!(active instanceof HTMLElement) || !scroll.contains(active)) return;
      const field = active.getBoundingClientRect(), bounds = scroll.getBoundingClientRect();
      const inset = parseFloat(getComputedStyle(scroll).paddingTop) || 0;
      if (field.bottom > bounds.bottom - inset) scroll.scrollTop += field.bottom - bounds.bottom + inset;
      else if (field.top < bounds.top + inset) scroll.scrollTop -= bounds.top + inset - field.top;
    };
    const resize = () => {
      element.style.setProperty('--sheet-height', `${viewport?.height ?? window.innerHeight}px`);
      element.style.setProperty('--sheet-bottom', `${Math.max(0, window.innerHeight - (viewport?.height ?? window.innerHeight) - (viewport?.offsetTop ?? 0))}px`);
      element.style.setProperty('--sheet-surface-height', `${element.getBoundingClientRect().height}px`);
      cancelAnimationFrame(frame); frame = requestAnimationFrame(keepFocusVisible);
    };
    resize(); viewport?.addEventListener('resize', resize); viewport?.addEventListener('scroll', resize);
    element.addEventListener('focusin', resize); element.addEventListener('input', resize); window.addEventListener('resize', resize);
    const observer = new ResizeObserver(resize); observer.observe(element);
    return () => {
      viewport?.removeEventListener('resize', resize); viewport?.removeEventListener('scroll', resize);
      observer.disconnect();
      cancelAnimationFrame(frame); element.removeEventListener('focusin', resize); element.removeEventListener('input', resize); window.removeEventListener('resize', resize);
      element.close(); document.body.style.overflow = overflow; previous?.focus();
    };
  }, []);
  return <dialog ref={dialog} className={`task-sheet paper${floating ? ' floating-sheet' : ''}${decorated ? ' storybook-sheet' : ''}`} data-covered={covered || undefined} aria-labelledby={headingId} onCancel={e => { e.preventDefault(); onClose(); }} onKeyDown={e => {
    if (e.key !== 'Tab') return;
    const controls = [...e.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex="0"]')].filter(el => el.getClientRects().length > 0);
    const first = controls[0], last = controls[controls.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  }}>
    <span className="paper-surface" aria-hidden="true" />
    {decorated && <span className="sheet-handle" aria-hidden="true" />}
    <div className="sheet-body">
      <header className={`sheet-heading${actions ? ' composer-actions' : ''}`}>
        <h2 id={headingId} className={actions ? 'sr-only' : undefined}>{title}</h2>
        <button type="button" className={decorated ? "text-button storybook-close" : "text-button"} aria-label="Close" onClick={onClose}>{decorated ? <svg viewBox="0 0 24 24" className="ink-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18" /></svg> : "Close"}</button>
        {actions}
      </header>
      {children}
    </div>
  </dialog>;
}
