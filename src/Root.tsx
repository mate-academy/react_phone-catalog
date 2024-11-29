import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';

import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ScrollToTop } from './components/ScrollToTop';
import { ProductNotFound } from './components/ProductNotFound';

export const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="*" element={<ProductNotFound />} />

            <Route path="/home" element={<Navigate to="/" replace={true} />} />
            <Route index element={<HomePage />} />

            <Route path="/phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="/tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="/accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="/favourites">
              <Route index element={<FavouritesPage />} />
            </Route>

            <Route path="/cart">
              <Route index element={<CartPage />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
};
