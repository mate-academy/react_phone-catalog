import { HashRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { App } from './App';
import { NotFoundPage } from './modules/NotFoundPage';
import { TabletsPage } from '@modules/TabletsPage';
import { AccessoriesPage } from '@modules/AccessoriesPage';
import { ProductDetailsPage } from '@modules/ProductDetailsPage';
import { FavouritesPage } from '@modules/FavouritesPage';
import { CartPage } from '@modules/CartPage';
import { SkeletonProvider } from '@src/providers/SkeletonProvider';
import { Provider } from 'react-redux';
import { store } from './app/store';

export const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <SkeletonProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<PhonesPage />} />
            <Route path="tablets" element={<TabletsPage />} />
            <Route path="accessories" element={<AccessoriesPage />} />
            <Route
              path="product/:category/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </SkeletonProvider>
    </HashRouter>
  </Provider>
);
