import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { backToTop } from '../../../utils/backToTop';

export const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => backToTop, [pathname]);

  return null;
};
