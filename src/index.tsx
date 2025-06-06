import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route element={<App />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />

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

          <Route path="/favourites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

root.render(<Root />);
