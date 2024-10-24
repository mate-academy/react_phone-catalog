export const accessLocalStorage = {
  key: 'todos',
  get() {
    const data = localStorage.getItem(this.key);

    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  set(todos: unknown) {
    try {
      localStorage.setItem(this.key, JSON.stringify(todos));

      return this.get;
    } catch {
      return [];
    }
  },
};
