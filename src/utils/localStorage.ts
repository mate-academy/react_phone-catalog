export function loadFromLocalStorage<T>(name: string): T[] {
  const saved = localStorage.getItem(name);

  return saved ? (JSON.parse(saved) as T[]) : [];
}

export function saveToLocalStorage<T>(name: string, items: T[]): void {
  localStorage.setItem(name, JSON.stringify(items));
}
