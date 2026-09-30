export const MAX_WORDS = 30;
export const countWords = (text: string) => text.match(/\S+/gu)?.length ?? 0;

/** Keep the first fitting words of the insertion, never truncate existing suffix text. */
export function insertWithinLimit(value: string, start: number, end: number, insertion: string) {
  const before = value.slice(0, start), after = value.slice(end);
  if (countWords(before + insertion + after) <= MAX_WORDS)
    return { value: before + insertion + after, caret: start + insertion.length };
  const words = [...insertion.matchAll(/\S+/gu)];
  for (let n = words.length - 1; n >= 1; n--) {
    const last = words[n - 1];
    const accepted = insertion.slice(0, last.index! + last[0].length);
    // Preserve separation from existing suffix words when truncating a paste.
    const separator = after && !/^\s/u.test(after) && /\s/u.test(insertion.slice(accepted.length)) ? ' ' : '';
    if (countWords(before + accepted + separator + after) <= MAX_WORDS)
      return { value: before + accepted + separator + after, caret: start + accepted.length + separator.length };
  }
  return { value, caret: start };
}

/** Native edits, undo, dictation and IME fallback; restrict only the changed portion. */
export function limitEdit(previous: string, next: string) {
  if (countWords(next) <= MAX_WORDS) return { value: next, caret: null };
  let start = 0;
  while (start < previous.length && start < next.length && previous[start] === next[start]) start++;
  let oldEnd = previous.length, newEnd = next.length;
  while (oldEnd > start && newEnd > start && previous[oldEnd - 1] === next[newEnd - 1]) { oldEnd--; newEnd--; }
  return insertWithinLimit(previous, start, oldEnd, next.slice(start, newEnd));
}
