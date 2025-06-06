export function appLocaleStorage(key: string) {
  return {
    getData: () => {
      const data = localStorage.getItem(key);

      if (!data) {
        return;
      }

      try {
        return JSON.parse(data);
      } catch {
        return;
      }
    },
    setData: (data: unknown) => localStorage.setItem(key, JSON.stringify(data)),
    delete: () => localStorage.removeItem(key),
  };
}
