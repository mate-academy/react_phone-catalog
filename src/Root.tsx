import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import '@styles/../main.scss';

import { App } from '@App/App';
import { HomePage } from './modules/HomePage';
import { PageNotFound } from './modules/NotFoundPage';
import { ProductsPage } from './modules/ProductsPage';

import { store } from '@store/store';
import { ProductDetailsPage } from '@ProductDetailsPage/ProductDetailsPage';

function getProductRoute(path: string) {
  return (
    <Route path={path}>
      <Route index element={<ProductsPage />} />
      <Route path=":productId" element={<ProductDetailsPage />} />
    </Route>
  );
}

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            {getProductRoute('phones')}
            {getProductRoute('tablets')}
            {getProductRoute('accessories')}

            <Route path="favorites" element={<ProductsPage />} />
            <Route path="shopping-bag" element={<ProductsPage />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};
