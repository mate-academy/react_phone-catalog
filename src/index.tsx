import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Catalog } from './components/Catalog/Catalog';
import { HomePage } from './components/HomePage/HomePage';

import productsFromServer from './api/products.json';
import { Product } from './types/Propduct';
import { ProductDetails } from './components/ProductDetails/ProductDetails';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
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
          path="products/:itemId"
          element={<ProductDetails category="phones" />}
        />
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
          path="products/:itemId"
          element={<ProductDetails category="tablets" />}
        />
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
          path="products/:itemId"
          element={<ProductDetails category="accessories" />}
        />
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
