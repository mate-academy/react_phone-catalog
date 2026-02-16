export function getStoredItems<T>(key: string, initialValue: T): T {
  const savedItems = localStorage.getItem(key);

  if (savedItems === null) {
    return initialValue;
  }

  try {
    return JSON.parse(savedItems);
  } catch (e) {
    localStorage.removeItem(key);

    return initialValue;
  }
}
