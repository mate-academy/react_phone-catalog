import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { HomePage } from '../HomePage';
import { ProductsPage } from '../ProductPage';
import { RouterValidator } from '../../shared/components/RouterValidator';
import { ProductDetailsPage } from '../ProductDetailsPage';
import { CartPage } from '../CartPage';
import { FavoritesPage } from '../FavoritesPage';
import { NotFoundPage } from '../NotFoundPage';
import { PRODUCT_CATEGORIES } from '../../shared/constants/ProductCategories';
import { AppProvider } from '../../shared/contexts/CartFavoritesContext';
import { ScrollToTop } from '../../shared/components/ScrollToTop';

import styles from './App.module.scss';

export const App: React.FC = () => (
  <AppProvider>
    <Router>
      <RouterValidator>
        <div className={styles.App}>
          <h1 className="visually-hidden">Product Catalog</h1>

          <Header />

          <main className="main">
            <ScrollToTop />

            <Routes>
              <Route path="/" element={<HomePage />} />

              {PRODUCT_CATEGORIES.map(category => (
                <Route
                  key={category}
                  path={`/${category}`}
                  element={<ProductsPage category={category} />}
                />
              ))}

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
      </RouterValidator>
    </Router>
  </AppProvider>
);
