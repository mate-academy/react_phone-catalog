import { createBrowserRouter } from 'react-router-dom';

import { MainTemplate } from '@/components/templates';

import {
  CartPage,
  CatalogPage,
  CheckoutPage,
  ContactsPage,
  FavouritesPage,
  HomePage,
  NotFoundPage,
  ProductPage,
  RightsPage,
} from '@/pages';
import { OrderHistoryPage } from '@/pages/OrderHistoryPage/OrderHistoryPage';

import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    element: <MainTemplate />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.CATALOG, element: <CatalogPage /> },
      { path: ROUTES.PRODUCT, element: <ProductPage /> },
      { path: ROUTES.FAVOURITES, element: <FavouritesPage /> },
      { path: ROUTES.CART, element: <CartPage /> },
      { path: ROUTES.CHECKOUT, element: <CheckoutPage /> },
      { path: ROUTES.NOTFOUND, element: <NotFoundPage /> },
      { path: ROUTES.RIGHTS, element: <RightsPage /> },
      { path: ROUTES.CONTACTS, element: <ContactsPage /> },
      { path: ROUTES.HISTORY, element: <OrderHistoryPage /> },
    ],
  },
]);
