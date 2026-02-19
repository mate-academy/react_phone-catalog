export const loadItemsLocalStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);

  if (data === null) {
    return [];
  }

  try {
    return JSON.parse(data) as T;
  } catch (e) {
    localStorage.removeItem(key);

    return [];
  }
};
