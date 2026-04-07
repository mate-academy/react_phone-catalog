import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
// import useFetch from './hooks/useFetch';

import './App.scss';
import { HomePage } from './pages/HomePage';
import { PhonePage } from './pages/PhonePage';
import { TabletPage } from './pages/TabletPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  // const { data: phones, loading, error, reload } = useFetch('/api/phones.json');

  // На початку App.tsx або main.tsx
  const CART_VERSION = 'v2';

  if (localStorage.getItem('cart_version') !== CART_VERSION) {
    localStorage.removeItem('cart');
    localStorage.setItem('cart_version', CART_VERSION);
  }

  return (
    <div className="App">
      {/* <h1
        className="item-12 full-width home-title"
        style={{ visibility: 'hidden' }}
      >
        Product Catalog
      </h1> */}
      <div className="app-wrapper">
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<PhonePage />} />
            <Route path="/phones/:productId" element={<ProductDetailPage />} />
            <Route path="/tablets" element={<TabletPage />} />
            <Route path="/tablets/:productId" element={<ProductDetailPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route
              path="/accessories/:productId"
              element={<ProductDetailPage />}
            />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {/* <h1>Product Catalog</h1> */}
        </main>
        <Footer />
      </div>
    </div>
  );
};
