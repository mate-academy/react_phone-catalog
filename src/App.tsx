import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { FavProvider } from './providers/FavProvider/FavProvider';
import { CartProvider } from './providers/CartProvider/CartProvider';

import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { ProductDetailsPage }
  from './pages/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { getProducts } from './api/products';

import { Product } from './types/Product';
import { ProductType } from './types/ProductType';

import './App.scss';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch {
      throw new Error('Loading Error');
    }
  };

  const phones = useMemo(() => {
    return products.filter(
      (product) => product.type === ProductType.phone,
    );
  }, [products]);

  const tablets = useMemo(() => {
    return products.filter(
      (product) => product.type === ProductType.tablet,
    );
  }, [products]);

  const accessories = useMemo(() => {
    return products.filter(
      (product) => product.type === ProductType.accessory,
    );
  }, [products]);

  const suggestedProducts = useMemo(() => {
    return [...products].sort(() => Math.random() - 0.5);
  }, [products]);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="app">
      <CartProvider>
        <FavProvider>
          <Header />

          <main className="main">
            <Routes>
              <Route path="/">
                <Route index element={<HomePage products={products} />} />

                <Route path="phones">
                  <Route index element={<PhonesPage phones={phones} />} />
                  <Route
                    path=":productId"
                    element={(
                      <ProductDetailsPage
                        products={phones}
                        suggestedProducts={suggestedProducts}
                      />
                    )}
                  />
                </Route>

                <Route path="tablets">
                  <Route index element={<TabletsPage tablets={tablets} />} />
                  <Route
                    path=":productId"
                    element={(
                      <ProductDetailsPage
                        products={tablets}
                        suggestedProducts={suggestedProducts}
                      />
                    )}
                  />
                </Route>

                <Route path="accessories">
                  <Route
                    index
                    element={<AccessoriesPage accessories={accessories} />}
                  />
                  <Route
                    path=":productId"
                    element={(
                      <ProductDetailsPage
                        products={accessories}
                        suggestedProducts={suggestedProducts}
                      />
                    )}
                  />
                </Route>

                <Route path="cart" element={<CartPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </main>

          <Footer />
        </FavProvider>
      </CartProvider>
    </div>
  );
};

export default App;
