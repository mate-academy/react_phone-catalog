import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './modules/HomePage';
import { CategoryPage } from './modules/CategoryPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritePage } from './modules/FavoritePage/FavoritePage';
import { NotFound } from './components/NotFound';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoriteContext';
import { ThemeProvider } from './modules/shared/context/ThemeContext';
import './styles/global.scss';

const App: React.FC = () => {
  useTranslation();

  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:type" element={<CategoryPage />} />
                <Route
                  path="/product/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
