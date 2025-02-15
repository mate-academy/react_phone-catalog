import { Provider } from 'react-redux';

import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import '@styles/../main.scss';

import { App } from '@App/App';
import { HomePage } from './modules/HomePage';
import { PageNotFound } from './modules/NotFoundPage';
import { ProductsPage } from './modules/ProductsPage';
import { FavoritesPage } from './modules/FavoritesPage';

import { store } from '@store/store';
import { ProductDetailsPage } from '@ProductDetailsPage/ProductDetailsPage';

import { useHistory } from '@hooks/useHistory';

function getProductRoute(path: string) {
  return (
    <Route path={path}>
      <Route index element={<ProductsPage />} />
      <Route path=":productId" element={<ProductDetailsPage />} />
    </Route>
  );
}

export const Root = () => {
  const { resetHistory } = useHistory();

  resetHistory();
  history.scrollRestoration = 'manual';

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            {getProductRoute('phones')}
            {getProductRoute('tablets')}
            {getProductRoute('accessories')}

            <Route path="favorites" element={<FavoritesPage />} />
            {/* <Route path="shopping-bag" element={<ProductsPage />} /> */}

            <Route path="404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};
