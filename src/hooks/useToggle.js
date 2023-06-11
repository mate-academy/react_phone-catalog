import { useState } from 'react';

export const useToggle = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(val) {
    setValue(currentValue => (
      typeof val === 'boolean' ? value : !currentValue
    ));
  }

  return [value, toggleValue];
};
