import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { useState } from 'react';

import { HomePage } from './pages/HomePage';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ProductsDetailsPage } from './pages/ProductsDetailsPage';
import { Product } from './utils/Product';
import { ProductsCatalogPage } from './pages/ProductsCatalogPage/';
import { FavoritesProvider } from './context/FavouritesContext';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import { NotFoundPage } from './pages/NotFoundPage';
import { ScrollToTop } from './utils/ScrollToTop';

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
                    path="api/phones.json"
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
                    path="api/tablets.json"
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
                    path="api/accessories.json"
                  />
                }
              />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/:category/:productId"
                element={<ProductsDetailsPage />}
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
