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

export const App = () => {
  // const { data: phones, loading, error, reload } = useFetch('/api/phones.json');

  return (
    <div className="App">
      <h1
        className="item-12 full-width home-title"
        style={{ visibility: 'hidden' }}
      >
        Product Catalog
      </h1>
      <div className="app-wrapper">
        <Header />

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
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
        {/* <h1>Product Catalog</h1> */}

        <Footer />
      </div>
    </div>
  );
};
