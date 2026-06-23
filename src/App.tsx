import { Route, Routes } from 'react-router-dom';

import { HomePage } from './components/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './components/CartPage/CartPage';
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './components/ProductDetails/ProductDetailsPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/tablets" element={<TabletsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};
