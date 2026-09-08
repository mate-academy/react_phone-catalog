/* eslint-disable max-len */
import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './app/store';
import { HomePage } from './modules/HomePage/components/HomePage';
import { PhonePage } from './modules/PhonesPage/components/PhonePage';
import { TabletPage } from './modules/TabletPage/components/TabletPage';
import { AccessoriesPage } from './modules/AccessoriesPage/components/AccessoriesPage';
import { FavouritesPage } from './modules/FavouritesPage/components/FavouritesPage';
import { CartPage } from './modules/CartPage/components/CartPage';
import { PageNotFound } from './modules/PageNotFound/PageNotFound';
import { ProductDetailsPage } from './modules/shared/Shared_Components/ProductDetailsPage/ProductDetailsPage';
import { DarkModeProvider } from './Store/StoreThemeMode';
import { FavouritesProvider } from './Store/FavouritesStore';
import { CartStoreProvider } from './Store/CartStore';
import { CheckoutPage } from './modules/CheckoutPage/CheckoutPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CheckoutProvider } from './Store/CheckoutStore';
import { CheckoutErrorsProvider } from './Store/CheckoutErrorStore';

export const Root: React.FC = () => {
  const elements = {
    phones: <PhonePage />,
    tablets: <TabletPage />,
    accessories: <AccessoriesPage />,
  };

  return (
    <Router>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="220649396450-asi8o9qt4ce1q0itn43rehngor8rfkdl.apps.googleusercontent.com">
          <DarkModeProvider>
            <FavouritesProvider>
              <CartStoreProvider>
                <CheckoutProvider>
                  <CheckoutErrorsProvider>
                    <Routes>
                      <Route path="/" element={<App />}>
                        <Route index element={<HomePage />} />

                        <Route path="home" element={<HomePage />} />

                        {Object.entries(elements).map(
                          ([pathname, component]) => (
                            <Route key={pathname} path={pathname}>
                              <Route index element={component} />
                              <Route
                                path=":productId"
                                element={<ProductDetailsPage />}
                              />
                            </Route>
                          ),
                        )}

                        <Route path="favorites" element={<FavouritesPage />} />

                        <Route path="cart" element={<CartPage />} />

                        <Route path="checkout" element={<CheckoutPage />} />

                        <Route path="*" element={<PageNotFound />} />
                      </Route>
                    </Routes>
                  </CheckoutErrorsProvider>
                </CheckoutProvider>
              </CartStoreProvider>
            </FavouritesProvider>
          </DarkModeProvider>
        </GoogleOAuthProvider>
      </Provider>
    </Router>
  );
};
