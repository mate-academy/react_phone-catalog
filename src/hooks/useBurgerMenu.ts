import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const MENU_HASH = '#menu';

export const useBurgerMenu = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  const isOpen = hash === MENU_HASH;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate({ pathname, search, hash: '' }, { replace: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, navigate, pathname, search]);

  return { isOpen };
};
