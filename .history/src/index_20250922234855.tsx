/* eslint-disable max-len */
import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { ProductProvider } from './ProductsProvider';
import { StoreProvider } from './StoreProvider';
import { HomePage } from './components/HomePage/HomePage';
import { ProductPage } from './components/ProductPage/ProductPage';
import { ProductDetailsPage } from './components/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './components/CartPage/CartPage';
import { FavouritesPage } from './components/FavouritesPage/FavouritesPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductProvider>
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<ProductPage category="phones" />} />
            <Route path="tablets" element={<ProductPage category="tablets" />}
            />
            <Route path="accessories"
              element={<ProductPage category="accessories" />}
            />
            <Route path="product/:productId" element={<ProductDetailsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavouritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </StoreProvider>
  </ProductProvider>,
);
