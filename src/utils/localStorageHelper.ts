import { LocaleStorage } from '../definitions/enums/LocaleStorage';

function write<T>(key: LocaleStorage, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function read<T>(key: LocaleStorage) {
  const value = localStorage.getItem(key);

  if (value === null) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function has(key: LocaleStorage) {
  return localStorage.getItem(key) !== null;
}

function init<T>(key: LocaleStorage, value: T) {
  if (has(key)) {
    return read<T>(key) as T;
  }

  write<T>(key, value);

  return value;
}

function push<T>(key: LocaleStorage, ...values: T[]) {
  const array = init<T[]>(key, []);

  array.push(...values);

  write<T[]>(key, array);
}

function remove<T extends string | number>(key: LocaleStorage, ...values: T[]) {
  if (!has(key)) {
    throw new Error(`You can't remove values from an array if it hasn't been initialized. Key: ${key} `);
  }

  const array = read<T[]>(key) as T[];
  const filteredArray = array.filter(value => !values.includes(value));

  const removedValuesAmount = array.length - filteredArray.length;

  write<T[]>(key, filteredArray);

  return removedValuesAmount;
}

export const storage = {
  has,
  write,
  read,
  init,
  push,
  remove,
};
