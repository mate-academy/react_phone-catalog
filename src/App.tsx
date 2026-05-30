import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { AppProvider } from './context/AppContext';
import { HomePage } from './pages/HomePage';
import { useEffect, useState } from 'react';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    setIsMenuOpen(searchParams.has('menu'));
  }, [location]);

  return (
    <div className="App">
      <AppProvider>
        <Header />

        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />

            <Route path="phones" element={<CategoryPage category="phones" />} />
            <Route
              path="tablets"
              element={<CategoryPage category="tablets" />}
            />
            <Route
              path="accessories"
              element={<CategoryPage category="accessories" />}
            />

            <Route path="product/:productId" element={<ProductPage />} />
            <Route path="phones/:productId" element={<ProductPage />} />
            <Route path="tablets/:productId" element={<ProductPage />} />
            <Route path="accessories/:productId" element={<ProductPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {isMenuOpen && <Menu />}
        </main>

        <Footer />
      </AppProvider>
    </div>
  );
};
