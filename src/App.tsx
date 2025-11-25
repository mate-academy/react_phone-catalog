import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import './styles/fonts.scss';
import './App.scss';
import { FavoriteProvider } from './shared/contexts/FavoriteContext';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartProvider } from './shared/contexts/CartContext';
import { CartPage } from './modules/CartPage/CartPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';

export const App = () => (
  <CartProvider>
    <FavoriteProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<PhonesPage />} />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/product/:productId"
                element={<ProductDetailsPage />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </FavoriteProvider>
  </CartProvider>
);
