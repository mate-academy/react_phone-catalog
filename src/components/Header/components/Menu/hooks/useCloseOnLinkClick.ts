import { RefObject, useEffect } from 'react';

export function useCloseOnLinkClick(
  ref: RefObject<HTMLElement>,
  onClose: () => void,
) {
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const handleClick = (e: PointerEvent) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }

      const link = e.target.closest('a');

      if (!link) {
        return;
      }

      onClose();
    };

    element.addEventListener('click', handleClick);

    return () => element.removeEventListener('click', handleClick);
  }, [onClose, ref]);
}
