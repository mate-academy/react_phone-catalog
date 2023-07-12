import { useEffect, useState } from 'react';

export const useAlert = (initValue: boolean):
[value: boolean, toggleValue: () => void] => {
  const [value, setValue] = useState(initValue);

  const toggleValue = () => {
    setValue(!value);
  };

  useEffect(() => {
    if (value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [value]);

  return [value, toggleValue];
};
