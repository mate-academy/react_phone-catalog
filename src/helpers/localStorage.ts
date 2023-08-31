import { RootState } from '@/app/store';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (!serializedState) {
      return;
    }

    return JSON.parse(serializedState);
  } catch {
    return;
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
