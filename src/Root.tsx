import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { GlobalProvider } from './store/GlobalContext';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavoritesPage } from './modules/FavoritesPage';

export const Root = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="phones">
              <Route index element={<ProductPage category="phones" />} />

              <Route path=":productItemId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<ProductPage category="tablets" />} />

              <Route path=":productItemId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<ProductPage category="accessories" />} />

              <Route path=":productItemId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="favorites" element={<FavoritesPage />} />

            <Route path="cart" element={<ShoppingCartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
};
