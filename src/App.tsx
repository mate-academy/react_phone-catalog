import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

import { ProductProvider } from './components/ProductProvider';
import { Wrapper } from './components/Wrapper';
import { HomePage } from './components/pages/HomePage';
import { PhonesPage } from './components/pages/PhonesPage';
import { TabletsPage } from './components/pages/TabletsPage';
import { AccessoriesPage } from './components/pages/AccessoriesPage';
import { FavouritesPage } from './components/pages/FavoritesPage';
import { CartPage } from './components/pages/CartPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { ProductDetailsPage } from './components/pages/ProductDetailsPage';
import { CartProvider } from './components/CartProvider';
import { FavouriteProvider } from './components/FavouriteProvider';

const App: React.FC = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <FavouriteProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Wrapper />}>
                <Route index element={<HomePage />} />
                <Route path="phones">
                  <Route index element={<PhonesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="tablets">
                  <Route index element={<TabletsPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="accessories">
                  <Route index element={<AccessoriesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>

                <Route path="favourites" element={<FavouritesPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
        </FavouriteProvider>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
