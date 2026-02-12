import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { CartProvider } from './modules/shared/context/CartContext';

export const App = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <div className="App">
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<PhonesPage />} />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route
                path="/product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />

              <Route path="/home" element={<Navigate to="/" replace />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </FavoritesProvider>
  );
};
