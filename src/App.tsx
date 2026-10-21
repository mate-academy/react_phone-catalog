import { Navigate, Route, Routes } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ProductsProvider } from './context/ProductsContext';

import { CartPage } from './pages/CartPage';
import { CatalogPage } from './pages/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

import styles from './App.module.scss';

export const App = () => {
  return (
    <ProductsProvider>
      <FavoritesProvider>
        <CartProvider>
          <div className={styles.app}>
            <Header />

            <main className={styles.main}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="home" element={<Navigate to="/" replace />} />

                <Route
                  path="phones"
                  element={
                    <CatalogPage
                      category="phones"
                      title="Phones page"
                      breadcrumb="Phones"
                    />
                  }
                />
                <Route
                  path="tablets"
                  element={
                    <CatalogPage
                      category="tablets"
                      title="Tablets page"
                      breadcrumb="Tablets"
                    />
                  }
                />
                <Route
                  path="accessories"
                  element={
                    <CatalogPage
                      category="accessories"
                      title="Accessories page"
                      breadcrumb="Accessories"
                    />
                  }
                />

                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="cart" element={<CartPage />} />

                <Route
                  path="product/:productId"
                  element={<ProductDetailsPage />}
                />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </CartProvider>
      </FavoritesProvider>
    </ProductsProvider>
  );
};
