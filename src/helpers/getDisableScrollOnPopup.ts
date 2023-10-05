import { useEffect } from 'react';

export const useDisableScrollOnPopup = (showPopup: boolean) => {
  useEffect(() => {
    const bodyElement = document.querySelector('body');

    if (bodyElement) {
      if (showPopup) {
        bodyElement.classList.add('popup-open');
        bodyElement.style.overflow = 'hidden';
      } else {
        bodyElement.classList.remove('popup-open');
        bodyElement.style.overflow = 'auto';
      }
    }

    return () => {
      if (bodyElement) {
        bodyElement.classList.remove('popup-open');
        bodyElement.style.overflow = 'auto';
      }
    };
  }, [showPopup]);
};
