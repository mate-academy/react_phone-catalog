export const getStorageData = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);

    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
};
