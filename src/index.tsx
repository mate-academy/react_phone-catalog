import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { PAGE } from './constants/Router';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import { store } from './app/store';
import ProductPage from './pages/ProductPage';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<App />}>
            <Route index path={PAGE.Home} element={<HomePage />} />
            <Route path={PAGE.Cart} element={<CartPage />} />
            <Route path={PAGE.Favorites} element={<FavoritesPage />} />

            <Route path=":category" element={<ProductsPage />} />
            <Route path=":category/:productId" element={<ProductPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>,
  );
