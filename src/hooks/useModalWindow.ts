import { useEffect } from 'react';

import { useBoolean } from './useBoolean';

export const useModalWindow = (isOpen: boolean) => {
  const [isModalShown, toggleIsModalShown] = useBoolean(isOpen);

  useEffect(() => {
    document.body.style.overflow = isModalShown ? 'hidden' : 'auto';
  }, [isModalShown]);

  return [isModalShown, toggleIsModalShown] as const;
};
