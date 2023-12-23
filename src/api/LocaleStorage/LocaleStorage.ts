/* eslint-disable no-console */
// local-storage.js
// local-storage.ts

// local-storage.ts

export const getItem = <T>(key: string): T | null => {
  try {
    const serializedItem = localStorage.getItem(key);

    return serializedItem ? JSON.parse(serializedItem) : null;
  } catch (error) {
    console.error('Error retrieving item from localStorage:', error);

    return null;
  }
};

export const setItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting item in localStorage:', error);
  }
};

export const deleteItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error deleting item from localStorage:', error);
  }
};
