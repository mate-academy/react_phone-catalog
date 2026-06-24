import { Outlet, useLocation } from 'react-router-dom';
import { NotFoundPage } from '../modules/NotFoundPage';
import React from 'react';

const validPaths = [
  '/',
  '/cart',
  '/favourites',
  '/product',
  '/phones',
  '/tablets',
  '/accessories',
];

export const RouterValidator = () => {
  const location = useLocation();
  const path = location.pathname;

  const isValid = validPaths.some(
    valid => valid === path || path.startsWith(valid + '/'),
  );

  return isValid ? <Outlet /> : <NotFoundPage />;
};
