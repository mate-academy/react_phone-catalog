import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  menuRef: RefObject<HTMLElement>,
  callback: () => void,
  buttonRef: RefObject<HTMLElement> = { current: null },
) => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as Node;

    if (menuRef.current && !menuRef.current.contains(target)) {
      if (buttonRef.current?.contains(target)) {
        return;
      } else {
        callback();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};
