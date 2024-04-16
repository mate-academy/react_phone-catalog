import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { PageNotFound } from './modules/PageNotFound';

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};
