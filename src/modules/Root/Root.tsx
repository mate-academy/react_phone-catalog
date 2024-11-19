import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../../app/store';

import { App } from '../App';
import { HomePage } from '../HomePage';
import { NotFoundPage } from '../NotFoundPage';
import { FavouritesPage } from '../FavouritesPage';
import { CartPage } from '../CartPage';
export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to={'/'} replace />} />
          <Route path="phones" element={<h1>Phones Page</h1>} />
          <Route path="tablets" element={<h1>Tablets Page</h1>} />
          <Route path="accessories" element={<h1>Accessories Page</h1>} />

          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
