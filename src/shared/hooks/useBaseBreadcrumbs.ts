import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { baseBreadcrumbs } from '@/shared/constants';
import { Breadcrumb } from '@/shared/types';

export const useBaseBreadcrumbs = (): Breadcrumb[] => {
  const location = useLocation();

  return useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean);

    return baseBreadcrumbs.filter(item =>
      segments.some(path => `/${path}` === item.to),
    );
  }, [location.pathname]);
};
