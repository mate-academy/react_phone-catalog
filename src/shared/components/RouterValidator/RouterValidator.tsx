import React from 'react';
import { useLocation } from 'react-router-dom';
import { NotFoundPage } from '../../../modules/NotFoundPage';
import { VALID_PATHS } from '../../constants/ValidPaths';

type Props = {
  children: React.ReactNode;
};

export const RouterValidator: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  const isProductDetailsPage = pathname.startsWith('/product/');
  const isValidPath = VALID_PATHS.includes(pathname) || isProductDetailsPage;

  if (!isValidPath) {
    return <NotFoundPage />;
  }

  return <>{children}</>;
};
