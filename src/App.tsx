import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const App = () => (
  <CartProvider>
    <FavoritesProvider>
      <Router basename="/react_phone-catalog/">
        <div className="App">
          <Header />
          <main>
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
              <Route
                path="/product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  </CartProvider>
);
