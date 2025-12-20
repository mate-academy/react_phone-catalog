import './App.scss';
import './styles/fonts.scss';
import { Header } from './components/Header';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { Footer } from './components/Footer';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { FavoritesPage } from './modules/FavoritesPage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const App = () => (
  <CartProvider>
    <FavoritesProvider>
      <BrowserRouter basename="/react_phone-catalog">
        <div className="App">
          <Header />
          <main className="app_content">
            <div className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/phones">
                  <Route index element={<PhonesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="/tablets">
                  <Route index element={<TabletsPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="/accessories">
                  <Route index element={<AccessoriesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </main>
          <Footer className="footer" />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  </CartProvider>
);
