import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ContactsPage } from './pages/ContactsPage';
import { RightsPage } from './pages/RightsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import styles from './App.module.scss';

export const App = () => (
  <div className={styles.app}>
    <ScrollToTop />
    <Header />
    <main className={styles.main}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/phones" element={<ProductsPage category="phones" />} />
        <Route path="/tablets" element={<ProductsPage category="tablets" />} />
        <Route
          path="/accessories"
          element={<ProductsPage category="accessories" />}
        />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/rights" element={<RightsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);
