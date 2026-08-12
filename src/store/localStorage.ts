export const loadFromLocalStorage = <T>(key: string, fallback: T): T => {
  try {
    const savedValue = localStorage.getItem(key);

    if (!savedValue) {
      return fallback;
    }

    return JSON.parse(savedValue) as T;
  } catch {
    return fallback;
  }
};

export const saveToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
