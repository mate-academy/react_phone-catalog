import { useEffect, useRef, useState } from 'react';
import { uiToApiMap } from './apiUiMappers';

type Props<T> = {
  setFilter: (param: T) => void;
};

export const useDropdown = <T>({ setFilter }: Props<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const button = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLUListElement>(null);

  const onButton = () => {
    setIsOpen(!isOpen);
  };

  const onOption = (uiValue: string) => {
    setFilter(uiToApiMap.get(uiValue) as T);
    setIsOpen(false);
    button.current?.blur();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        button.current &&
        dropdown.current &&
        !button.current.contains(event.target as Node) &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        button.current.blur();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, button, onButton, onOption, dropdown };
};
