import './styles/reset.scss';
import './styles/fonts.scss';
import './styles/variables.scss';
import './styles/global.scss';
import { createRoot } from 'react-dom/client';

import { createHashRouter, Navigate } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
// import { phones } from './../public/api/phones.json';
import products from './../public/api/products.json';

const filteredProducts = (category: string) => {
  return products.filter(product => product.category === category);
};

const router = createHashRouter([
  {
    path: '/home',
    element: <Navigate to={'/'} />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/phones',
    element: (
      <CatalogPage
        pathName={'Phones'}
        title={'Mobile phones'}
        products={filteredProducts('phones')}
      />
    ),
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
