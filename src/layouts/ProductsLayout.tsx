import { Outlet } from 'react-router-dom';
import { PaginationProvider } from '../providers/PaginationProvider';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FC } from 'react';

export const ProductsLayout: FC = () => {
  return (
    <div className="">
      <Breadcrumbs className="mt-6" />
      <PaginationProvider>
        <Outlet />
      </PaginationProvider>
    </div>
  );
};
