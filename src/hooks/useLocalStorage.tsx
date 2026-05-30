import { storage } from '@/utils/localStorage';
import { useState } from 'react';

type DispatchAction<T> = T | ((prevState: T) => T);

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const data = storage.get<T>(key);

    return data ? data : initialValue;
  });

  function handleDispatch(action: DispatchAction<T>) {
    if (typeof action === 'function') {
      const actionFn = action as (prevState: T) => T;

      setValue(prevState => {
        const newValue = actionFn(prevState);

        storage.save(key, newValue);

        return newValue;
      });
    } else {
      setValue(action);
      storage.save(key, action);
    }
  }

  return [value, handleDispatch] as const;
}
