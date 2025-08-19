export const saveToStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);

  return data ? (JSON.parse(data) as T) : null;
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};
