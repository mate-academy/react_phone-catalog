import { useState } from 'react';

export const useLocalStorage = <Type>(
  key: string,
  initialValue: Type[],
) => {
  const [value, setValue] = useState(() => {
    try {
      const valueInStorage = localStorage.getItem(key);

      return valueInStorage ? JSON.parse(valueInStorage) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const saveValue = (valueToSave: Type[]) => {
    setValue(valueToSave);

    localStorage.setItem(key, JSON.stringify(valueToSave));
  };

  return [value, saveValue];
};
