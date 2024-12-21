import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { GlobalProvider } from './store/GlobalContext';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const Root = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path=":productsType" element={<ProductPage />} />
            <Route
              path=":productsType/:productItemId"
              element={<ProductDetailsPage />}
            />

            <Route path="cart" element={<ShoppingCartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
};
