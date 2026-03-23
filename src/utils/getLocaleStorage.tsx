export const getLocaleStorage = (storage: string) => {
  const data = localStorage.getItem(storage);

  return data ? JSON.parse(data) : [];
};
