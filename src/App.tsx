import React from 'react';
import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import {
  HomePage,
  Footer,
  PhonesPage,
  TabletsPage,
  AccessoriesPage,
  NotFoundPage,
  FavouritesPage,
  CartPage,
} from './pages';

export const App: React.FC = () => (
  <div className={styles.App}>
    <Header />
    <div className={styles.container}>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    <Footer />
  </div>
);
