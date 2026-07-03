export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveToStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};
