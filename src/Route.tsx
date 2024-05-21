import { createHashRouter } from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/HomePage/Home';
import { Phones } from './pages/PhonesPage/Phones';
import { Error } from './pages/ErrorPage/Error';
import { Tablets } from './pages/TabletsPage/Tablets';
import { Accessories } from './pages/AccessoriesPage/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { Product } from './pages/ProductPage/Product';

export const root = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'phones',
        element: <Phones />,
      },
      {
        path: 'tablets',
        element: <Tablets />,
        children: [
          {
            path: ':productId',
            element: <Product />,
          },
        ],
      },
      {
        path: 'accessories',
        element: <Accessories />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
]);
