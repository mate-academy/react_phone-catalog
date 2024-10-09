import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import store, { persistor } from './app/store';
import { HomePage } from './modules/HomePage/HomePage';
import ProductsPage from './modules/ProductsPage/ProductsPage';
import PageNotFound from './modules/PageNotFound/PageNotFound';
import FavoritePage from './modules/FavoritePage/FavoritePage';
import { PersistGate } from 'redux-persist/integration/react';
import { startTransition } from 'react';

export const Root = () => {
  const handleLoad = () => {
    startTransition(() => {
    });
  };

  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} onBeforeLift={handleLoad}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<ProductsPage variant="phones" />} />
            <Route path="tablets" element={<ProductsPage variant="tabless" />} />
            <Route
              path="accessories"
              element={<ProductsPage variant="accesories" />}
            />
            <Route path="cart" element={<></>} />
            <Route path="favorites" element={<FavoritePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </PersistGate>
  </Provider>
)};
