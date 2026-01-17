import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { HomePage } from './modules/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PhonesPage } from './modules/PhonesPage';
import { FavoritesPage } from './modules/FavouritesPage/FavouritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { TabletPage } from './modules/TabletPage';
import { AccessoriePage } from './modules/AccessoriePage';
import { ProductPage } from './modules/ProductPage/ProductPage';
import { MainLayout } from './MainLayout';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <div className={styles.App}>
      <h1 className={styles.hidden}>Product Catalog</h1>

      <Header />

      <main className={styles.App__content}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<PhonesPage />} />
            <Route path="tablets" element={<TabletPage />} />
            <Route path="accessories" element={<AccessoriePage />} />
            <Route path="phones/:itemId" element={<ProductPage />} />
            <Route path="tablets/:itemId" element={<ProductPage />} />
            <Route path="accessories/:itemId" element={<ProductPage />} />
            <Route path="favourites" element={<FavoritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
