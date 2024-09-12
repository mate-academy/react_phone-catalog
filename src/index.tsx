import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Catalog } from './components/Catalog/Catalog';
import { HomePage } from './components/HomePage/HomePage';

import productsFromServer from './api/products.json';
import { Product } from './types/Propduct';
import { ProductDetails } from './components/ProductDetails/ProductDetails';
import { FavoritePage } from './components/FavoritePage/FavoritePage';
import { BasketPage } from './components/BasketPage/BasketPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="product/:itemId" element={<ProductDetails />} />
      <Route path="favorites" element={<FavoritePage />} />
      <Route path="basket" element={<BasketPage />} />
      <Route path="phones">
        <Route
          index
          element={
            <Catalog
              products={productsFromServer.filter(
                (product: Product) => product.category === 'phones',
              )}
              key={'phones'}
            />
          }
        />
        <Route
          path="product/:itemId"
          element={<ProductDetails category="phones" />}
        >
          <Route path="favorites" element={<FavoritePage />} />
          <Route path="basket" element={<BasketPage />} />
        </Route>
        <Route path="favorites" element={<FavoritePage />} />
        <Route path="basket" element={<BasketPage />} />
      </Route>
      <Route path="tablets">
        <Route
          index
          element={
            <Catalog
              products={productsFromServer.filter(
                (product: Product) => product.category === 'tablets',
              )}
              key={'tablets'}
            />
          }
        />
        <Route
          path="product/:itemId"
          element={<ProductDetails category="tablets" />}
        >
          <Route path="favorites" element={<FavoritePage />} />
          <Route path="basket" element={<BasketPage />} />
        </Route>
        <Route path="favorites" element={<FavoritePage />} />
        <Route path="basket" element={<BasketPage />} />
      </Route>
      <Route path="accessories">
        <Route
          index
          element={
            <Catalog
              products={productsFromServer.filter(
                (product: Product) => product.category === 'accessories',
              )}
              key={'accessories'}
            />
          }
        />
        <Route
          path="product/:itemId"
          element={<ProductDetails category="accessories" />}
        >
          <Route path="favorites" element={<FavoritePage />} />
          <Route path="basket" element={<BasketPage />} />
        </Route>
        <Route path="favorites" element={<FavoritePage />} />
        <Route path="basket" element={<BasketPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Root />
  </Router>,
);
