import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CategoryPage } from './pages/CategoryPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RightsPage } from './pages/RightsPage';

export const App = () => {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<CategoryPage category="phones" />} />
          <Route
            path="/tablets"
            element={<CategoryPage category="tablets" />}
          />
          <Route
            path="/accessories"
            element={<CategoryPage category="accessories" />}
          />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/rights" element={<RightsPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};
