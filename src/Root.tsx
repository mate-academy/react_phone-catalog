import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFound } from './pages/NotFound/NotFound';
import { Catalog } from './pages/Catalog/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { FavoritesPage } from './pages/FavoritesPage';
import { CardPage } from './pages/CardPage';

export const Root = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="/phones" element={<Catalog catalog="phones" />} />
              <Route path="/tablets" element={<Catalog catalog="tablets" />} />
              <Route
                path="/accessories"
                element={<Catalog catalog="accessories" />}
              />
              <Route
                path="/:category/:productId"
                element={<ProductDetails />}
              />
              <Route path="/cart" element={<CardPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />

              <Route path="*" element={<NotFound title="Not Found" />} />
            </Route>
          </Routes>
        </HashRouter>
      </FavoritesProvider>
    </CartProvider>
  );
};
