import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { PhonesPage } from './pages/PhonesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductPage } from './pages/ProductPage';
import { FavoritePage } from './pages/FavoritePage';
import store from './app/store';
import { Provider } from 'react-redux';
import { CartPage } from './pages/CartPage';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId?" element={<ProductPage />} />
          </Route>

          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":productId?" element={<ProductPage />} />
          </Route>

          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":productId?" element={<ProductPage />} />
          </Route>

          <Route path="favorite" element={<FavoritePage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
