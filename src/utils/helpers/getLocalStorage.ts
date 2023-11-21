export const getLocalStorageData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);

  if (data === null) {
    return [];
  }

  return JSON.parse(data);
};

export const setLocalStorageData = <T>(key: string, data: T[]): void => {
  const prepearedData = JSON.stringify(data);

  localStorage.setItem(key, prepearedData);
};
