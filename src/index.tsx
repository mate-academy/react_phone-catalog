import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { PAGE } from './definitions/enums/Router';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import { store } from './store/store';
import ProductPage from './pages/ProductPage';
import ErrorMessage from './components/common/ErrorMessage';

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

            <Route
              path="*"
              element={<ErrorMessage message='Resource not found. Please check URL.' />}
            />
            </Route>
        </Routes>
      </Router>
    </Provider>,
  );
