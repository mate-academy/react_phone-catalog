import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './modules/HomePage/HomePage';
import { CategoryPage } from './modules/CategoryPage/CategoryPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritePage } from './modules/FavoritesPage/FavoritePage';
import { NotFound } from './components/NotFound/NotFound';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoriteContext';
import { ThemeProvider } from './modules/shared/context/ThemeContext';
import './styles/global.scss';

const App: React.FC = () => {
  const { t } = useTranslation();

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
