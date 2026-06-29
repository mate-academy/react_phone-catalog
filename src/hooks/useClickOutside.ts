import { RefObject, useEffect } from 'react';

type UseClickOutsideParams = {
  ref: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
};

export const useClickOutside = ({
  ref,
  isOpen,
  onClose,
}: UseClickOutsideParams) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node;

      if (!ref.current?.contains(targetNode)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, ref, onClose]);
};
