import {
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  catalogPageLoader,
  homePageLoader,
  mainLoader,
  productDescriptionLoader,
  revalidate,
} from './api/apiProducts';
import { CartPage } from './pages/CartPage';
import { CatalogPageWrapper } from './pages/CatalogPageWrapper';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDescriptionPage } from './pages/ProductDescriptionPage';
import { Root } from './Root';
import { Category } from './types/Category';

export const routes = createRoutesFromElements(
  <Route
    path="/"
    element={<Root />}
    errorElement={<NotFoundPage />}
    loader={mainLoader}
    shouldRevalidate={() => false}
  >
    <Route
      index
      element={<HomePage />}
      loader={homePageLoader}
      shouldRevalidate={() => false}
    />

    <Route path="home" element={<Navigate to="/" />} />

    <Route path=":category">
      <Route
        index
        element={<CatalogPageWrapper />}
        errorElement={<NotFoundPage />}
        loader={({ params }) => catalogPageLoader(params.category as Category)}
        shouldRevalidate={({ currentParams, nextParams }) => {
          return revalidate(currentParams.category, nextParams.category);
        }}
      />

      <Route
        path=":productID"
        loader={({ params }) => productDescriptionLoader(params.productID)}
        element={<ProductDescriptionPage />}
        shouldRevalidate={({ currentParams, nextParams }) => {
          return revalidate(currentParams.productID, nextParams.productID);
        }}
      />
    </Route>

    <Route
      path="favorites"
      element={<FavoritesPage />}
    />

    <Route
      path="cart"
      element={<CartPage />}
    />
  </Route>,
);
