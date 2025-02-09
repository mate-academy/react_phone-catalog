import { Navigate, HashRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { ProductProvider } from './components/Contexts/ProductsContext';
import { CartProvider } from './components/Contexts/CartContext';
import { FavouritesProvider } from './components/Contexts/FavouritesContext';
import { ShoppingCartPage } from './pages/ShoppingCartPage';

export const Root = () => (
  <ProductProvider>
    <CartProvider>
      <FavouritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path=":category">
                <Route index element={<ProductPage />} />
                <Route path=":itemId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<ShoppingCartPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </FavouritesProvider>
    </CartProvider>
  </ProductProvider>
);
