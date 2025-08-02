import { localStorageKey } from '../enums/localStorageKey';
import { wait } from './fetchData';

export async function loadFromLocalStorage<T>(
  key: localStorageKey,
): Promise<T> {
  try {
    await wait(1800);
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : ([] as T);
  } catch (error) {
    console.error(`Error reading "${key}" from localStorage:`, error);
    return [] as T;
  }
}

export function saveToLocalStorage<T>(key: localStorageKey, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving "${key}" to localStorage:`, error);
  }
}
