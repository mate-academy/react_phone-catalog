import { useCallback, useMemo, useState } from 'react';
import { useRouter } from '../_hooks/useRouter';
import { LOCATIONS } from '../../common/constants';

export const useHeader = () => {
  const [isNavOpen, setOpen] = useState(false);
  const { location } = useRouter();
  const path = location.pathname;

  const handleNavOpen = useCallback(() => {
    document.body.classList.toggle('nav-open');

    setOpen(!isNavOpen);
  }, [isNavOpen]);

  const searchInputIsHidden = useMemo(() => (
    (path === LOCATIONS.phones)
    || (path === LOCATIONS.tablets)
    || (path === LOCATIONS.favorites)
  ), [path]);

  return {
    handleNavOpen,
    searchInputIsHidden,
    isNavOpen,
  }
}
