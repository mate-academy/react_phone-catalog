import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Catalog } from './components/Catalog/Catalog';
import { HomePage } from './components/HomePage/HomePage';

import productsFromServer from './api/products.json';
import { Product } from './types/Propduct';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route
        path="phones"
        element={
          <Catalog
            products={productsFromServer.filter(
              (product: Product) => product.category === 'phones',
            )}
            key={'phones'}
          />
        }
      ></Route>
      <Route
        path="tablets"
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
        path="accessories"
        element={
          <Catalog
            products={productsFromServer.filter(
              (product: Product) => product.category === 'accessories',
            )}
            key={'accessories'}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Root />
  </Router>,
);
