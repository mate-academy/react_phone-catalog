import { useEffect } from 'react';

type OutsideClick = (
  ref: React.RefObject<HTMLElement>,
  onOutsideClick: () => void,
) => void;

export const useOutsideClick: OutsideClick = (ref, onOutsideClick) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [ref, onOutsideClick]);
};
