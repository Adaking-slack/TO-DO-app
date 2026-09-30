export type Destination = 'Home' | 'Inbox' | 'Calendar' | 'Profile';
export type AppAction = { type: 'create-task' } | { type: 'open-task'; id: string } | { type: 'navigate'; destination: Destination } | { type: 'confirm-parent-completion'; id: string };
/** Shared action boundary. App handles creation, editing, Home/Inbox, and completion confirmation. */
export function requestAction(action: AppAction) {
  window.dispatchEvent(new CustomEvent<AppAction>('little-magic:action', { detail: action }));
}
