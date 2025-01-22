import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import '@styles/main.scss';

import { App } from './modules/App/';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';

import { PhonesProvide } from '@store/PhonesStore';
import { TabletsProvide } from '@store/TabletStore';
import { AccessoriesProvide } from '@store/AccessoriesStore';

export const Root = () => {
  return (
    <Router>
      <PhonesProvide>
        <TabletsProvide>
          <AccessoriesProvide>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="phones" element={<ProductsPage />} />
                <Route path="tablets" element={<ProductsPage />} />
                <Route path="accessories" element={<ProductsPage />} />
                <Route path="favorite" element={<ProductsPage />} />
                <Route path="shopping-bag" element={<ProductsPage />} />
              </Route>
            </Routes>
          </AccessoriesProvide>
        </TabletsProvide>
      </PhonesProvide>
    </Router>
  );
};
