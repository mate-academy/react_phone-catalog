import { useCallback, useState } from 'react';

type UseBoolean = (
  defaultValue: boolean,
) => [boolean, (newValue?: boolean) => void];

export const useBoolean: UseBoolean = defaultValue => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const toggleIsOpen = useCallback(
    (newValue?: boolean) =>
      setIsOpen(newValue ?? (currentIsOpen => !currentIsOpen)),
    [],
  );

  return [isOpen, toggleIsOpen];
};
