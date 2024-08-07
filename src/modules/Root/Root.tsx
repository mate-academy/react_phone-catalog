import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../HomePage';
import { CartPage } from '../CartPage';
import { CategoryPage } from '../CategoryPage';
import { ProductPage } from '../ProductPage';
import { FavouritesPage } from '../FavouritesPage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { NotFoundPage } from '../NotFoundPage';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="phones">
            <Route index element={<CategoryPage />} />
            <Route path=":itemId" element={<ProductPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<CategoryPage />} />
            <Route path=":itemId" element={<ProductPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<CategoryPage />} />
            <Route path=":itemId" element={<ProductPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
