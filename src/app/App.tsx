import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from '../shared/layout/Footer';
import { Header } from '../shared/layout/Header';
import './App.module.scss';
import '../shared/styles/main.scss';
import { HomePage } from '../modules/HomePage/HomePage';
import { ProductsPage } from '../modules/ProductsPage/ProductsPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';
import { Favorites } from '../modules/Favorites';
import { Cart } from '../modules/Cart';
import styles from './App.module.scss';
import { NotFoundPage } from '../shared/layout/NotFoundPage';

export const App = () => (
  <div className={styles.wrapper}>
    <Header />
    <main className={styles.main}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/phones"
          element={<ProductsPage title={'Mobile page'} />}
        />
        <Route
          path="/tablets"
          element={<ProductsPage title={'Tablets page'} />}
        />

        <Route
          path="/accessories"
          element={<ProductsPage title={'Accessories page'} />}
        />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/:category/:productId" element={<ProductDetailsPage />} />

        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);
