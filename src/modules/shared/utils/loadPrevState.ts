export function loadPrevState<T>(key: string): T | void {
  const data = localStorage.getItem(key);

  if (!data) {
    return;
  }

  try {
    return JSON.parse(data);
  } catch {
    localStorage.removeItem(key);

    return;
  }
}
