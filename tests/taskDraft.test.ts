import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTask } from '../src/taskDraft.ts';

test('rejects whitespace-only titles and normalizes title-only capture', () => {
  assert.throws(() => normalizeTask({ title: ' \n ', completed: false }), /title/);
  const task = normalizeTask({ title: '  Buy groceries  ', completed: false });
  assert.equal(task.title, 'Buy groceries'); assert.ok(task.id); assert.ok(task.createdAt);
  assert.equal(task.date, undefined); assert.equal(task.time, undefined);
});
test('clearing a date drops time while preserving independent optional properties', () => {
  const task = normalizeTask({ title: 'Task', completed: false, date: '', time: '12:30', description: ' Details ', reminder: '2026-10-01T10:00', priority: 'low', category: 'Work', recurrence: 'Daily', subtasks: [{ id: 'one', title: ' First ', completed: true }, { id: 'blank', title: ' ', completed: false }] });
  assert.equal(task.time, undefined); assert.equal(task.description, 'Details'); assert.equal(task.reminder, '2026-10-01T10:00');
  assert.equal(task.priority, 'low'); assert.equal(task.category, 'Work'); assert.equal(task.recurrence, 'Daily');
  assert.deepEqual(task.subtasks, [{ id: 'one', title: 'First', completed: true }]); assert.equal(task.completed, false);
});
test('edits retain identity, creation timestamp, and independent completion', () => {
  const existing = normalizeTask({ title: 'Original', completed: true, subtasks: [{ id: 'child', title: 'Child', completed: false }] });
  const edited = normalizeTask({ ...existing, title: 'Updated', date: '2026-10-01', time: '09:00' }, existing);
  assert.equal(edited.id, existing.id); assert.equal(edited.createdAt, existing.createdAt);
  assert.equal(edited.completed, true); assert.equal(edited.subtasks?.[0].completed, false);
  assert.equal(edited.time, '09:00');
});
