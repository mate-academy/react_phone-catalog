import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer';
import { HomePage } from './HomePage';
import { ProductsPage } from './ProductsPage';
import { ProductDetailsPage } from './ProductDetailsPage';
import { CartPage } from './CartPage';
import { FavoritesPage } from './FavoritesPage';
import { NotFoundPage } from './NotFoundPage';

export const App = () => (
  <BrowserRouter>
    <CartProvider>
      <FavoritesProvider>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/phones"
              element={<ProductsPage category="phones" />}
            />
            <Route
              path="/tablets"
              element={<ProductsPage category="tablets" />}
            />
            <Route
              path="/accessories"
              element={<ProductsPage category="accessories" />}
            />
            <Route path="/phones/:itemId" element={<ProductDetailsPage />} />
            <Route path="/tablets/:itemId" element={<ProductDetailsPage />} />
            <Route
              path="/accessories/:itemId"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  </BrowserRouter>
);
