export function getLocalStorage<T>(key: string, value: T) {
  const data = localStorage.getItem(key);

  if (data === null) {
    return value;
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    return value;
  }
}
