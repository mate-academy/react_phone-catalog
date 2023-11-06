import ReactDOM from 'react-dom';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import App from './App';
import { ProductsProvider } from './helpers/ProductsContext';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductsDetailsPage } from './pages/ProductsDetailsPage';
import { TabletsPage } from './pages/TabletsPage';

const Root = () => (
  <HashRouter>
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<p>Page not found</p>} />
          <Route index element={<HomePage />} />

          <Route path="phones" element={<PhonesPage />} />
          <Route
            path="phones/:productId"
            element={<ProductsDetailsPage parentPath="Phones" />}
          />

          <Route path="tablets" element={<TabletsPage />} />
          <Route
            path="tablets/:productId"
            element={<ProductsDetailsPage parentPath="Tablets" />}
          />

          <Route path="accessories" element={<AccessoriesPage />} />
          <Route
            path="accessories/:productId"
            element={<ProductsDetailsPage parentPath="Accessories" />}
          />

          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </ProductsProvider>
  </HashRouter>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
