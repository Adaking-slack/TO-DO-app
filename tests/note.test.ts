import { test } from 'node:test';
import assert from 'node:assert/strict';
import { countWords, insertWithinLimit, limitEdit } from '../src/note.ts';
const words = (n: number) => Array.from({ length: n }, (_, i) => 'word' + i).join(' ');
test('counts whitespace-separated words without counting blank input', () => {
  assert.equal(countWords('  \n '), 0); assert.equal(countWords("one\ttwo\nthree"), 3);
});
test('pasting 35 words into empty note keeps the first 30', () => {
  assert.equal(insertWithinLimit('', 0, 0, words(35)).value, words(30));
});
test('pasting into the middle retains all existing suffix words', () => {
  const old = 'beginning ending';
  const result = insertWithinLimit(old, 10, 10, words(35) + ' ');
  assert.equal(countWords(result.value), 30);
  assert.ok(result.value.startsWith('beginning ')); assert.ok(result.value.endsWith(' ending'));
});
test('31st word rejected; extending final word allowed', () => {
  const old = words(30);
  assert.equal(limitEdit(old, old + ' extra').value, old);
  assert.equal(limitEdit(old, old + 'extended').value, old + 'extended');
});
test('selected text replacement and deletion still work at limit', () => {
  const old = words(30);
  assert.equal(countWords(insertWithinLimit(old, 0, 5, 'new').value), 30);
  assert.equal(countWords(limitEdit(old, words(25)).value), 25);
});
test('no room for paste leaves existing note untouched', () => {
  const old = words(30);
  assert.equal(insertWithinLimit(old, 0, 0, 'new ').value, old);
});

