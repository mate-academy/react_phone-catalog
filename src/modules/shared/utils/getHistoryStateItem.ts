export function getHistoryStateItem<T>(key: string): T | void {
  if (history.state) {
    return window.history.state[key];
  }
}
