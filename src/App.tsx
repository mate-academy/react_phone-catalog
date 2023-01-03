import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Footer } from './components/Footer';
import { SavedItemsProvider } from './helpers/SavedItemsContext';
import './App.scss';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { PageNotFound } from './pages/PageNotFound';

const App = () => {
  const { pathname } = useLocation();

  // reset scroll on changing page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <div className="App">
      <SavedItemsProvider>
        <Header />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/phones/:productId" element={<ProductDetailsPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/tablets/:productId" element={<ProductDetailsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route
            path="/accessories/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </SavedItemsProvider>
    </div>
  );
};

export default App;
