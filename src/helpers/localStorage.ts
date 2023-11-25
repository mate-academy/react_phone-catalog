/* eslint-disable import/no-cycle */
import { RootState } from '../app/store';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (!serializedState) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

type LocalStorageState = Omit<RootState, 'api'>;

export const saveState = (state: LocalStorageState) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  } catch {
    throw new Error('Failed to serialize state');
  }
};
