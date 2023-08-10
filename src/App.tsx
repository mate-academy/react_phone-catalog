import { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavProvider } from './context/FavContext';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartProvider } from './context/CartContext';
import { CartPage } from './pages/CartPage';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <div className="App">
      <CartProvider>
        <FavProvider>
          <Header />

          <main className="page">
            <div className="page__container">
              <Routes>
                <Route
                  path="/"
                  element={<HomePage />}
                />
                <Route
                  path="phones"
                  element={<PhonesPage />}
                />
                <Route
                  path="phones/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route
                  path="tablets"
                  element={<TabletsPage />}
                />
                <Route
                  path="tablets/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route
                  path="accessories"
                  element={<AccessoriesPage />}
                />
                <Route
                  path="accessories/:ProductId"
                  element={<ProductDetailsPage />}
                />
                <Route
                  path="favourites"
                  element={<FavouritesPage />}
                />
                <Route
                  path="cart"
                  element={<CartPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="home" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </FavProvider>
      </CartProvider>

      <Footer />
    </div>
  );
};
