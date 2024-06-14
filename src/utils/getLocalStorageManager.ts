export const getLocalStorageManager = <T>(key: string) => ({
  get(): T | null {
    try {
      const valueFromLocalStorage = localStorage.getItem(key);

      if (!valueFromLocalStorage) {
        return null;
      }

      return JSON.parse(valueFromLocalStorage);
    } catch (error) {
      return null;
    }
  },

  set(newValue: T | null) {
    if (!newValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  },
});
