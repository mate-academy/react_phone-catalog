import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { CategoryPage } from './modules/CategoryPage';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavouritesContextProvider } from './context/FavoritesContext';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';
import './styles/main.scss';
import { CartContextProvider } from './context/CartContext';

export const App = () => (
  <div className="app-wrapper">
    <CartContextProvider>
      <FavouritesContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/phones"
              element={<CategoryPage category="phones" />}
            />
            <Route
              path="/tablets"
              element={<CategoryPage category="tablets" />}
            />
            <Route
              path="/accessories"
              element={<CategoryPage category="accessories" />}
            />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/favorites" element={<FavouritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer />
        </Router>
      </FavouritesContextProvider>
    </CartContextProvider>
  </div>
);
