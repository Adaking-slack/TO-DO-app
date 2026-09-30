import { useState, type ReactNode } from 'react';
import { Sheet } from './Sheet';
import { InkIcon } from './TaskRow';
import { localDay } from './storage';

export function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return <div className="form-field"><label htmlFor={id}>{label}</label>{children}</div>;
}
export function formatSchedule(date?: string, time?: string) {
  if (!date) return '';
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const label = date === localDay() ? 'Today' : date === localDay(tomorrow) ? 'Tomorrow' : new Date(`${date}T12:00`).toLocaleDateString(undefined, { dateStyle: 'medium' });
  return time ? `${label} · ${new Date(`2000-01-01T${time}`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}` : label;
}
export function formatReminder(value?: string) {
  return value?.match(/^\d{4}-\d{2}-\d{2}T/) ? new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : value ?? '';
}
function NativePicker({ label, id, type, value, onChange, disabled = false }: {
  label: string; id: string; type: 'date' | 'time' | 'datetime-local'; value: string; onChange: (value: string) => void; disabled?: boolean;
}) {
  const formatted = !value ? `Choose ${label.toLowerCase()}` : type === 'date' ? formatSchedule(value) : type === 'time' ? new Date(`2000-01-01T${value}`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : formatReminder(value);
  return <Field label={label} id={id}>
    <div className={`picker-field${disabled ? ' disabled' : ''}`}>
      <InkIcon name={type === 'date' ? 'calendar' : type === 'time' ? 'clock' : 'bell'} /><span className={value ? '' : 'field-placeholder'}>{formatted}</span><InkIcon name="chevron" />
      <input id={id} type={type} value={value} disabled={disabled} onChange={e => onChange(e.target.value)} onClick={e => { try { e.currentTarget.showPicker(); } catch { /* Native picker/keyboard fallback. */ } }} />
    </div>
  </Field>;
}
export function SchedulePicker({ date, time, onClose, onApply }: { date?: string; time?: string; onClose: () => void; onApply: (date: string, time: string) => void }) {
  const [selectedDate, setDate] = useState(date ?? ''), [selectedTime, setTime] = useState(time ?? '');
  return <Sheet title="Date and time" floating onClose={onClose}>
    <form onSubmit={e => { e.preventDefault(); onApply(selectedDate, selectedDate ? selectedTime : ''); }}>
      <div className="form-section">
        <button type="button" className="text-button" onClick={() => setDate(localDay())}>Today</button>
        <NativePicker label="Due date" id="due-date" type="date" value={selectedDate} onChange={v => { setDate(v); if (!v) setTime(''); }} />
        <NativePicker label="Due time" id="due-time" type="time" value={selectedTime} disabled={!selectedDate} onChange={setTime} />
        {!selectedDate && <p className="field-hint">Choose a date to add a time.</p>}
        {selectedTime && <button type="button" className="text-button" onClick={() => setTime('')}>Remove time</button>}
      </div>
      <div className="sheet-actions"><button className="primary-button paper" type="submit"><span className="paper-surface" aria-hidden="true" />Apply date and time</button>
        {selectedDate && <button type="button" className="text-button" onClick={() => onApply('', '')}>Remove date and time</button>}
      </div>
    </form>
  </Sheet>;
}
export function ReminderPicker({ reminder, onClose, onApply }: { reminder?: string; onClose: () => void; onApply: (reminder: string) => void }) {
  const [selected, setSelected] = useState(reminder ?? '');
  const isDate = Boolean(selected.match(/^\d{4}-\d{2}-\d{2}T/));
  return <Sheet title="Reminder" floating onClose={onClose}>
    <form onSubmit={e => { e.preventDefault(); onApply(selected); }}>
      <div className="form-section"><NativePicker label="Remind me at" id="reminder-time" type="datetime-local" value={isDate ? selected : ''} onChange={setSelected} />
        {selected && !isDate && <p className="field-hint">Current reminder: {selected}</p>}
        <p className="field-hint">Reminders are saved with your task. Notifications are not available yet.</p>
      </div>
      <div className="sheet-actions"><button className="primary-button paper" type="submit"><span className="paper-surface" aria-hidden="true" />Apply reminder</button>
        {selected && <button type="button" className="text-button" onClick={() => onApply('')}>Remove reminder</button>}
      </div>
    </form>
  </Sheet>;
}
