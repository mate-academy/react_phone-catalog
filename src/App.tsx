import './App.scss';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './modules/Home page/HomePage';
import { ProductPage } from './modules/Product page/ProductPage';
import { ProductDetailsPage } from './modules/Product details page/ProductDetailsPage';
import { CartProvider } from './context/CartContext';
import { CartPage } from './modules/Cart/Cart';
import { FavouritesPage } from './modules/Favourites page/FavouritesPage';
import { FavouritesProvider } from './context/FavouritesContext';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import './i18n';

export const App = () => {
  return (
    <FavouritesProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/phones"
                element={<ProductPage category="phones" />}
              />
              <Route
                path="/tablets"
                element={<ProductPage category="tablets" />}
              />
              <Route
                path="/accessories"
                element={<ProductPage category="accessories" />}
              />
              <Route
                path="/:category/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </FavouritesProvider>
  );
};
