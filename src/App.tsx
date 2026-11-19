import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartProvider } from './context/CartContext';
import { CartPage } from './pages/CartPage';
import { FavoritesProvider } from './context/FavoritesContext';
import { FavoritesPage } from './pages/FavoritesPage';
import { ThemeProvider } from './context/ThemeContext';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="App">
            <Header />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<PhonesPage />} />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route
                path="/product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Footer />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
};
