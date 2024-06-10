export function getLocalStorage<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch {
    return null;
  }
}
