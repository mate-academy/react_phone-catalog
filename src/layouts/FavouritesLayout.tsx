import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FC } from 'react';

export const FavouritesLayout: FC = () => {
  return (
    <div className="h-full">
      <Breadcrumbs className="mt-6" />
      <Outlet />
    </div>
  );
};
