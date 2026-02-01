import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import HomePage from './modules/HomePage/index';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage';
import Header from './components/Header';
import Footer from './components/Footer/index';
import './App.scss';
import { useRef } from 'react';

const App = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  const onBackToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {' '}
      <div ref={containerRef} className="appContainer">
        <Header />
        <main className="main">
          <div className="main__content">
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="phones" element={<PhonesPage />} />
              <Route path="tablets" element={<TabletsPage />} />
              <Route path="accessories" element={<AccessoriesPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route
                path="product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <Footer onBackToTop={onBackToTop} />
      </div>
    </>
  );
};

export default App;
