import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const scrollPositions = {};

export function ScrollRestoration() {
  const { pathname } = useLocation();
  const oldPath = useRef(pathname);

  useEffect(() => {
    scrollPositions[oldPath.current] = window.scrollY;

    const saved = scrollPositions[pathname];

    if (saved !== undefined) {
      window.scrollTo(0, saved);
    } else {
      window.scrollTo(0, 0);

    oldPath.current = pathname;
  }, [pathname]);

  return null;
}
