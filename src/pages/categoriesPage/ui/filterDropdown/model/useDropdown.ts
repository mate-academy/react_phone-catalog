import { useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const button = useRef<HTMLButtonElement>(null);

  const handleToggle = () => setIsActive(!isActive);

  const handleItemSelect = (event: React.MouseEvent, id: number) => {
    setActiveIndex(id);
    setIsActive(false);
    button.current?.blur();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (button.current && !button.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  return { isActive, activeIndex, handleToggle, handleItemSelect, button };
};
