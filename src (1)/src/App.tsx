import { Route, Routes } from 'react-router-dom';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import './App.scss';

export const App = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <div className="App">
          <Header />

          <main className="App__main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/phones"
                element={<ProductsPage category="phones" title="Phones" />}
              />
              <Route
                path="/tablets"
                element={<ProductsPage category="tablets" title="Tablets" />}
              />
              <Route
                path="/accessories"
                element={<ProductsPage category="accessories" title="Accessories" />}
              />
              <Route path="/product/:productId" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </FavoritesProvider>
  );
};
