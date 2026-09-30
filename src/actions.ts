export type Destination = 'Home' | 'Inbox' | 'Calendar' | 'Profile';
export type AppAction = { type: 'create-task' } | { type: 'open-task'; id: string } | { type: 'navigate'; destination: Destination } | { type: 'confirm-parent-completion'; id: string };
/** Integration boundary. TODO: connect approved destination/confirmation designs. */
export function requestAction(action: AppAction) {
  window.dispatchEvent(new CustomEvent<AppAction>('little-magic:action', { detail: action }));
}
