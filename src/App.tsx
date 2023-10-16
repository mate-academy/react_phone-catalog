import { Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/products/PhonesPage';
import { TabletsPage } from './pages/products/TabletsPage';
import { AccessoriesPage } from './pages/products/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import {
  ACCESSORIES_LINK,
  CART_LINK,
  FAVORITES_LINK,
  HOME_LINK,
  PHONES_LINK,
  PRODUCT_LINK,
  TABLETS_LINK,
} from './helpers/constants/Links';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFoundPage } from './pages/NofFoundPage';

const App = () => {
  const productFullLink = `${PRODUCT_LINK}/:productId`;

  return (
    <div className="App">
      <Routes>
        <Route path={HOME_LINK} element={<HomePage />} />

        <Route
          path={PHONES_LINK}
          element={<PhonesPage />}
        />

        <Route
          path={TABLETS_LINK}
          element={<TabletsPage />}
        />

        <Route
          path={ACCESSORIES_LINK}
          element={<AccessoriesPage />}
        />

        <Route
          path={FAVORITES_LINK}
          element={<FavoritesPage />}
        />

        <Route
          path={CART_LINK}
          element={<CartPage />}
        />

        <Route
          path={productFullLink}
          element={<ProductDetailsPage />}
        />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
