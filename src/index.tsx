import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import 'normalize.css';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductPage } from './modules/ProductPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartProvider } from './shared/context/CartContext/CartContext';
import { FavoriteProvider } from './shared/context/FavoriteContext/FavoriteContext';
import { ThemeProvider } from './shared/context/ThemeContext/ThemeContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <ThemeProvider>
    <CartProvider>
      <FavoriteProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />}></Route>
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
              <Route path="/product/:productId" element={<ProductPage />} />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />

              <Route path="*" element={<h1>Page not found</h1>} />
            </Route>
          </Routes>
        </Router>
      </FavoriteProvider>
    </CartProvider>
  </ThemeProvider>,
);
