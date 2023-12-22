import {
  HashRouter as Router, Routes, Route,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { App } from './App';
import { PhonesPage } from './pages/PhonesPage';
import { HomePage } from './pages/HomePage';
import { getProducts } from './api';
import { Phone } from './types/Phone';
import { FavouritePage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { ProductCardPage } from './pages/ProductDetailsPage';
import { CartProvider } from './context/CardContext';
import { FavouriteProvider } from './context/FavouriteContext';

export const Root = () => {
  const [products, setProducts] = useState<Phone[]>([]);

  const loadProducts = async () => {
    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch {
      throw new Error('Loading products error');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Router>
      <CartProvider>
        <FavouriteProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage products={products} />} />
              <Route path=":category">
                <Route
                  index
                  element={<PhonesPage products={products} />}
                />

                <Route
                  path=":productId"
                  element={(<ProductCardPage products={products} />)}
                />
              </Route>
              <Route path="favourite" element={<FavouritePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Route>
          </Routes>
        </FavouriteProvider>
      </CartProvider>
    </Router>
  );
};
