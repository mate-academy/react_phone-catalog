import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { ProductProvider } from './ProductContext';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonePage } from './pages/PhonePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './component/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

export const Root = () => (
  <HashRouter>
    <ProductProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="/home" element={<Navigate to="/" />} />

          <Route path="/phones">
            <Route index element={<PhonePage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/tablets">
            <Route index element={<TabletsPage />} />
          </Route>

          <Route path="/accessories">
            <Route index element={<AccessoriesPage />} />
          </Route>

          <Route path="/favourites">
            <Route index element={<FavoritesPage />} />
          </Route>

          <Route path="/card">
            <Route index element={<CartPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ProductProvider>
  </HashRouter>
);
