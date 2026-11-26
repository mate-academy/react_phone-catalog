import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import './styles/index.scss';

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phones" element={<ProductsPage category="phones" />} />
      <Route path="/tablets" element={<ProductsPage category="tablets" />} />
      <Route
        path="/accessories"
        element={<ProductsPage category="accessories" />}
      />
      <Route path="/product/:productId" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export function App(): JSX.Element {
  return (
    <HashRouter>
      <CartProvider>
        <FavoritesProvider>
          <div className="app">
            <Header />
            <main className="app-main">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </HashRouter>
  );
}
