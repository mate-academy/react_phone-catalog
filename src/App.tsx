import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styles from './App.module.scss';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ProductsPage } from './modules/ProductsPage/ProductsPage';
import { Footer } from './modules/shared/components/Footer/Footer';
import { Header } from './modules/shared/components/Header/Header';
import { StoreProvider } from './modules/shared/context/StoreContext';

export const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <StoreProvider>
      <div className={styles.app}>
        <Header />

        <main className={styles.app__main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route
              path="/phones"
              element={<ProductsPage category="phones" title="Mobile phones" />}
            />
            <Route
              path="/tablets"
              element={<ProductsPage category="tablets" title="Tablets" />}
            />
            <Route
              path="/accessories"
              element={
                <ProductsPage category="accessories" title="Accessories" />
              }
            />

            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </StoreProvider>
  );
};

export default App;
