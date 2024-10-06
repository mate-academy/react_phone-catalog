import { createRoot } from 'react-dom/client';
import { App } from './App';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import store from './utils/store';
import { ProductDetails } from './modules/ProductDetails';

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route
              path="*"
              element={<h1 className="title not-found">Page not found</h1>}
            />

            <Route path="favourites" element={<FavouritesPage />} />

            <Route path="cart" element={<CartPage />} />

            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productId" element={<ProductDetails />} />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":productId" element={<ProductDetails />} />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":productId" element={<ProductDetails />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
