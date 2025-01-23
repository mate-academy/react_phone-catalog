import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import '@styles/main.scss';

import { App } from './modules/App/';
import { HomePage } from './modules/HomePage';
import { PageNotFound } from './modules/NotFoundPage';
import { ProductsPage } from './modules/ProductsPage';

import { MenuProvide } from '@store/MenuStore';
import { ProductsProvide } from '@store/ProductsStore';

export const Root = () => {
  return (
    <Router>
      <ProductsProvide>
        <MenuProvide>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="phones" element={<ProductsPage />} />
              <Route path="tablets" element={<ProductsPage />} />
              <Route path="accessories" element={<ProductsPage />} />
              <Route path="favorite" element={<ProductsPage />} />
              <Route path="shopping-bag" element={<ProductsPage />} />

              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </MenuProvide>
      </ProductsProvide>
    </Router>
  );
};
