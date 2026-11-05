import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

import { useNavigationStore } from '@/shared/model/navigation.store';

export const NavigationTracker = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  const push = useNavigationStore((state) => state.push);
  const replace = useNavigationStore((state) => state.replace);

  const lastLocationKey = useRef<string | null>(null);

  useEffect(() => {
    if (lastLocationKey.current === location.key) return;

    lastLocationKey.current = location.key;

    const path = location.pathname + location.search + location.hash;

    if (navigationType === 'REPLACE') {
      replace(path);
    } else {
      push(path);
    }
  }, [location, navigationType, push, replace]);

  return null;
};
