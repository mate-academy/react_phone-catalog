import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { Phone } from './types/Phone';
import { getProducts } from './api';
import { CartProvider } from './context/CartContext';
import { FavouriteProvider } from './context/FavouriteContext';
import { ProductPage } from './pages/1/ProductPage/ProductPage';
import { ProductCardPage } from './pages/ProductCardPage/ProductCardPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavouritePage } from './pages/FavouritePage/FavouritePage';

const App: React.FC = () => {
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
    <div className="App">
      <CartProvider>
        <FavouriteProvider>
          <NavBar />
          <main className="main__content">
            <Routes>
              <Route path="/react_phone-catalog/">
                <Route index element={<HomePage products={products} />} />

                <Route path=":category">
                  <Route
                    index
                    element={<ProductPage products={products} />}
                  />

                  <Route
                    path=":productId"
                    element={(<ProductCardPage products={products} />)}
                  />
                </Route>

                <Route path="cart" element={<CartPage />} />
                <Route path="favourite" element={<FavouritePage />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </FavouriteProvider>
      </CartProvider>
    </div>
  );
};

export default App;
