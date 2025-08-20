import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Product } from './utils/Product';
import { useState } from 'react';
import { ProductsCatalogPage } from './pages/ProductsCatalogPage';
import { FavoritesProvider } from './context/Favorites/FavoritesContext';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { CartProvider } from './context/CartContext/CartContext';
import { NotFoundPage } from './pages/NotFoundPage';
import { ScrollToTop } from './components/ScrollToTop';

export const App = () => {
  const [allItems, setAllItems] = useState<Product[]>([]);

  return (
    <div className="App">
      <FavoritesProvider>
        <CartProvider>
          <Header />
          <div className="App__content">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route
                path="/phones"
                element={
                  <ProductsCatalogPage
                    title="Mobile phones"
                    allItems={allItems}
                    setAllItems={setAllItems}
                    path="/api/phones.json"
                  />
                }
              />
              <Route
                path="/tablets"
                element={
                  <ProductsCatalogPage
                    title="Tablets"
                    allItems={allItems}
                    setAllItems={setAllItems}
                    path="/api/tablets.json"
                  />
                }
              />
              <Route
                path="/accessories"
                element={
                  <ProductsCatalogPage
                    title="Accessories"
                    allItems={allItems}
                    setAllItems={setAllItems}
                    path="/api/accessories.json"
                  />
                }
              />
              <Route path="/favourites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/:category/:productId"
                element={<ProductDetailsPage />}
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </CartProvider>
      </FavoritesProvider>
    </div>
  );
};
