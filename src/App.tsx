import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header } from './components/Header/Header';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { CartPage } from './pages/CartPage/CartPage';

export const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className={styles.app}>
          <Header />

          <div className={styles.section}>
            <div className={styles.container}>
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
                  path="/phones"
                  element={<CatalogPage category="phones" />}
                />

                <Route
                  path="/tablets"
                  element={<CatalogPage category="tablets" />}
                />

                <Route
                  path="/accessories"
                  element={<CatalogPage category="accessories" />}
                />

                <Route
                  path="/:category/:productId"
                  element={<ProductDetailsPage />}
                />

                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />

                {/* <Route
                  path="/phones"
                  element={<PhonesPage name="Mobile phones" items={products} />}
                /> */}
                {/* <Route path="/tablets" element={<TabletsPage />} />
      <Route path="/accessories" element={<AccessoriesPage />} />

      <Route path="/product/:productId" element={<ProductDetailsPage />} />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />*/}

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>

          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
};
