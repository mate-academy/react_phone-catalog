/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
export const setToStorage = (key: string, items: any) => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const getFromStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }

  return [];
};
