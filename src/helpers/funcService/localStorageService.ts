const setLocalStorageData = <T>(key: string, data: T[]) => {
  const preparedData = JSON.stringify(data);

  localStorage.setItem(key, preparedData);
};

const getLocalStorageData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);

  if (data === null) {
    return [];
  }

  return JSON.parse(data);
};

export const localStorageService = {
  setLocalStorageData, getLocalStorageData,
};
