import { LocalStorageKeys } from '../types';

export const saveToLocalSotrage = (
  name: LocalStorageKeys,
  payload: unknown,
) => {
  localStorage.setItem(name, JSON.stringify(payload));
};

export const getFromLocalSotrage = <T>(name: LocalStorageKeys): T => {
  const response = localStorage.getItem(name);

  return response && JSON.parse(response);
};
