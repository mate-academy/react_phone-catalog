export function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
