export function getLocalStorageItems<T>(key: string, startValue: T): T {
  const data = localStorage.getItem(key);

  if (!data) {
    return startValue;
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    localStorage.removeItem(key);

    return startValue;
  }
}

export function setLocalStorageItems<T>(key: string, newValue: T): void {
  localStorage.setItem(key, JSON.stringify(newValue));
}
