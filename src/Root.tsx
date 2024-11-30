import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { ProductsProvider } from './store/ProductsContext';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root = () => (
  <Router>
    <ProductsProvider>
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

          <Route path="cart" element={<CartPage />} />
          <Route path="catalog" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ProductsProvider>
  </Router>
);
