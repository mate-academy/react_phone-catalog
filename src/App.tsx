import { RouterProvider } from 'react-router-dom';

import { StoredProductsProvider } from '@shared/contexts/StoredProducts';
import { ThemeProvider } from '@shared/contexts/Theme.context';

import { router } from './router';

import './App.scss';

export const App = () => (
  <ThemeProvider>
    <StoredProductsProvider>
      <RouterProvider router={router} />
    </StoredProductsProvider>
  </ThemeProvider>
);
