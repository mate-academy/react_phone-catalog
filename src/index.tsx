import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { PAGE } from './definitions/enums/Router';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import { store } from './store/redux/store';
import ProductPage from './pages/ProductPage';
import ErrorMessage from './components/common/ErrorMessage';
import { ErrorProvider } from './store/contexts/ErrorContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Provider store={store}>
      <ErrorProvider>
        <Router>
          <Routes>
            <Route path={PAGE.Home} element={<App />}>
              <Route index element={<HomePage />} />
              <Route path={PAGE.Cart} element={<CartPage />} />
              <Route path={PAGE.Favorites} element={<FavoritesPage />} />

              <Route path=":category">
                <Route index element={<ProductsPage />} />
                <Route path=":productId" element={<ProductPage />} />
              </Route>

              <Route
                path="*"
                element={<ErrorMessage message='Resource not found. Please check URL.' />}
              />
            </Route>
          </Routes>
        </Router>
      </ErrorProvider>
    </Provider>,
  );
