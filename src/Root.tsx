import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { PAGE } from './definitions/enums/Router';
import { store } from './store/redux/store';

import { App } from './App';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import ProductPage from './pages/ProductPage';
import ErrorMessage from './components/common/ErrorMessage';
import { ContextProvider } from './store/contexts/GlobalContextProvider';
import CheckoutPage from './pages/CheckoutPage';
import { useEffect } from 'react';
import { prepareAdditionalInformation } from './utils/servicesHelper';

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
        <ContextProvider>
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
        </ContextProvider>
      </Router>
    </Provider>
  );
};
