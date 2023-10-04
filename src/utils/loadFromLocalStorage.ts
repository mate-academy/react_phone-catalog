export const loadFromLocalStorage = (key: string) => {
  const localStorageData = localStorage.getItem(key);

  return localStorageData ? JSON.parse(localStorageData) : [];
};
