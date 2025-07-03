import React, { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (value: React.SetStateAction<T>) => void] {
  const currentValue = () => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  };

  const [visibleValue, setVisibleValue] = useState(currentValue);

  const saveValue = (newValue: React.SetStateAction<T>) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setVisibleValue(newValue);
  };

  return [visibleValue, saveValue];
}
