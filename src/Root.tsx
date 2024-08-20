import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './modules/Footer';
import { HomePage } from './modules/HomePage/components/HomePage';
import { Header } from './modules/HomePage/components/Header';
import { ProductPage } from './modules/shared/ProductPage/ProductPage';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
// eslint-disable-next-line max-len
import { NotFoundPage } from './modules/HomePage/components/NotFoundPage/NotFoundPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/shared/ProductDetailsPage';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persister } from './app/store';
import { ProductCart } from './modules/ProductCart/ProductCart/ProductCart';
import { FavoritesPage } from './modules/Favoritespage';
export const Root = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <Header />
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="phones">
                <Route index element={<ProductPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="tablets">
                <Route index element={<ProductPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="accessories">
                <Route index element={<ProductPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="cart" element={<ProductCart />}></Route>
              <Route path="favorite" element={<FavoritesPage />}></Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </PersistGate>
      </Provider>
    </HashRouter>
  );
};
