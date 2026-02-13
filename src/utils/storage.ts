export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : null;
    } catch (error) {
      //console.error(`Error reading from localStorage:`, error);
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      //console.error(`Error writing to localStorage:`, error);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      //console.error(`Error removing from localStorage:`, error);
    }
  },
};
