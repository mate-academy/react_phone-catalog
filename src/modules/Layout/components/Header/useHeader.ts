import { useEffect } from 'react';
import { useBoolean } from '../../../../hooks/useBoolean';

type UseHeader = () => readonly [
  boolean,
  (newValue?: boolean | undefined) => void,
];

export const useHeader: UseHeader = () => {
  const [isOpen, toggleIsOpen] = useBoolean(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => toggleIsOpen(false);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [toggleIsOpen]);

  return [isOpen, toggleIsOpen];
};
