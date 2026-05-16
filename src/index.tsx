import './styles/reset.scss';
import './styles/fonts.scss';
import './styles/variables.scss';
import './styles/global.scss';
import { createRoot } from 'react-dom/client';

import { createHashRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
// import { phones } from './../public/api/phones.json';
import products from './../public/api/products.json';
import { App } from './App';
import { ProductPage } from './modules/ProductPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { CartPage } from './modules/CartPage';

const filteredProducts = (category: string) => {
  return products.filter(product => product.category === category);
};

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'phones',
        element: (
          <CatalogPage
            pathName={'Phones'}
            title={'Mobile phones'}
            products={filteredProducts('phones')}
          />
        ),
      },
      {
        path: 'tablets',
        element: (
          <CatalogPage
            pathName={'Tablets'}
            title={'Tablets'}
            products={filteredProducts('tablets')}
          />
        ),
      },
      {
        path: 'accessories',
        element: (
          <CatalogPage
            pathName={'Accessories'}
            title={'Accessories'}
            products={filteredProducts('accessories')}
          />
        ),
      },
      {
        path: 'product/:productId',
        element: <ProductPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage products={products} />,
      },
      {
        path: 'cart',
        element: <CartPage products={products} />,
      },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
