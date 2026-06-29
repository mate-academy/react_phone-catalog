import { LOCAL_STORAGE_KEYS } from '../constants/localeStorage';

type KeysValue = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

export const saveToLocalStorage = <T>(key: KeysValue, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: KeysValue, defaultValue: T): T => {
  const savedValue = localStorage.getItem(key);

  if (savedValue === null) {
    return defaultValue;
  }

  try {
    return JSON.parse(savedValue) as T;
  } catch {
    localStorage.removeItem(key);

    return defaultValue;
  }
};
