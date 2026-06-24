import { useEffect, useState } from 'react';

export const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  });

  return debouncedValue;
};
