import { createBrowserRouter } from 'react-router-dom';

import { App } from '../App';
import { CartPage } from '../pages/CartPage/CartPage';
import { FavouritesPage } from '../pages/FavouritesPage/FavouritesPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import { ProductPageWrapper } from '../components/ProductPageWrapper/ProductPageWrapper';
import { AuthPage } from '../pages/AuthPage';
import { RightsPage } from '../pages/RightsPage';
import { ContactsPage } from '../pages/ContactsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ':category',
        element: <ProductsPage />,
      },
      {
        path: ':category/:itemId',
        element: <ProductPageWrapper />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'favourites',
        element: <FavouritesPage />,
      },
      {
        path: 'login',
        element: <AuthPage />,
      },
      {
        path: 'rights',
        element: <RightsPage />,
      },
      {
        path: 'contacts',
        element: <ContactsPage />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
