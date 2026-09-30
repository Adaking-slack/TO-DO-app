import { useLayoutEffect, useRef, useState } from 'react';
import { countWords, insertWithinLimit, limitEdit } from './note';
import { keys, read, write } from './storage';

export function PersonalNote() {
  const [value, setValue] = useState(() => read(keys.note, '', (v): v is string => typeof v === 'string'));
  const editor = useRef<HTMLTextAreaElement>(null);
  const committed = useRef(value), composing = useRef(false);
  const words = countWords(value);
  const commit = (next: string, caret: number | null = null) => {
    committed.current = next; setValue(next); write(keys.note, next);
    if (editor.current) editor.current.value = next;
    if (caret !== null) editor.current?.setSelectionRange(caret, caret);
  };
  useLayoutEffect(() => {
    const element = editor.current!;
    const grow = () => {
      element.style.height = '0px'; element.style.height = `${element.scrollHeight}px`;
      // Keep the final writing line above fixed controls as the note grows.
      if (document.activeElement === element && element.selectionEnd === element.value.length) {
        const viewport = window.visualViewport;
        const home = document.querySelector<HTMLElement>('.home');
        const clearance = home ? parseFloat(getComputedStyle(home).paddingBottom) : 0;
        const bottom = (viewport?.height ?? window.innerHeight) + (viewport?.offsetTop ?? 0);
        const keyboard = Math.max(0, window.innerHeight - bottom);
        const overflow = element.getBoundingClientRect().bottom - (bottom - clearance + keyboard);
        if (overflow > 0) window.scrollBy({ top: overflow });
      }
    };
    grow(); const resize = new ResizeObserver(grow); resize.observe(element.parentElement!);
    return () => resize.disconnect();
  }, [value]);
  return <div className="personal-note paper" onClick={() => editor.current?.focus()}>
    <span className="paper-surface" aria-hidden="true" />
    <textarea ref={editor} rows={1} aria-label="Personal note" aria-describedby="note-limit"
      placeholder="Leave a little thought here…" value={value}
      onCompositionStart={() => { composing.current = true; }}
      onCompositionEnd={e => { composing.current = false; const result = limitEdit(committed.current, e.currentTarget.value); commit(result.value, result.caret); }}
      onChange={e => { if (composing.current) { setValue(e.target.value); return; } const result = limitEdit(committed.current, e.target.value); commit(result.value, result.caret); }}
      onPaste={e => { e.preventDefault(); const el = e.currentTarget; const result = insertWithinLimit(committed.current, el.selectionStart, el.selectionEnd, e.clipboardData.getData('text/plain')); commit(result.value, result.caret); }} />
    <span id="note-limit" className="sr-only">Up to 30 words. Saves automatically.</span>
    {words > 25 && <div className="note-counter" aria-live="polite">{Math.min(words, 30)}/30 words</div>}
  </div>;
}
