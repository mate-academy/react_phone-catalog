import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { useEffect } from 'react';
import { PAGE } from './definitions/enums/Router';
import { store } from './store/redux/store';

import { App } from './App';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import ProductPage from './pages/ProductPage';
import ErrorMessage from './components/common/ErrorMessage';
import CheckoutPage from './pages/CheckoutPage';
import { prepareAdditionalInformation } from './utils/servicesHelper';
import { SearchProvider } from './store/contexts/SearchContext';

export const Root: React.FC = () => {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(prepareAdditionalInformation);
    } else {
      setTimeout(prepareAdditionalInformation, 1000);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <SearchProvider>
          <Routes>
            <Route path={PAGE.Home} element={<App />}>
              <Route index element={<HomePage />} />
              <Route path={PAGE.Cart} element={<CartPage />} />
              <Route path={PAGE.Favorites} element={<FavoritesPage />} />
              <Route path={PAGE.Checkout} element={<CheckoutPage />} />

              <Route path=":category">
                <Route index element={<ProductsPage />} />
                <Route path=":productId" element={<ProductPage />} />
              </Route>

              <Route
                path="*"
                element={<ErrorMessage message="Resource not found. Please check URL." />}
              />
            </Route>
          </Routes>
        </SearchProvider>
      </Router>
    </Provider>
  );
};
