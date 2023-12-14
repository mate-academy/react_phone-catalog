import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import { HomePage } from './pages/HomePage';
import { GlobalProvider } from './Context/GlobalContext';
import { PhonePage } from './pages/PhonePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletPage } from './pages/TabletPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { PageNotFound } from './pages/PageNotFound';

export const Root = () => {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones">
              <Route index element={<PhonePage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path="tablets" element={<TabletPage />} />
            <Route path="accessories" element={<AccessoriesPage />} />
            <Route path="favourites" element={<FavoritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </Router>
  );
};
