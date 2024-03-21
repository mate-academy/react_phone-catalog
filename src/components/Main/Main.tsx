import React from 'react';
import { Outlet } from 'react-router-dom';

import { ProductsProvider } from '../../store/ProductsContext';

import './Main.scss';

export const Main: React.FC = () => {
  return (
    <main className="Main App__main">
      <ProductsProvider>
        <Outlet />
      </ProductsProvider>
    </main>
  );
};
