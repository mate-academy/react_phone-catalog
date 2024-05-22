import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { App } from '../App';
import React from 'react';
import { Products } from '../components/Products/Products';
import { HomePage } from '../components/HomePage/HomePage';
import { Provider } from 'react-redux';
import store from '../store/store';
import { ProductType } from '../Helpers/enumProductType';
// eslint-disable-next-line max-len
import { ProductDetails } from '../components/ProductDetail/ProductDetail';
import { Favorites } from '../components/Favorites/Favorites';
import { Cart } from '../components/Cart/Cart';
import { NotFoundPage } from '../components/NotFoundPage/NotFoundPage';
import { PageMenu } from '../components/Menu/PageMenu';
import { AnimatePresence } from 'framer-motion';

export const Root = () => {
  const location = useLocation();

  return (
    <Provider store={store}>
      <HashRouter>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<App />} />

            <Route path="home" element={<HomePage />} />
            <Route
              path="/phones"
              element={
                <Products type={ProductType.phones} title="Mobile phone" />
              }
            />

            <Route
              path="/tablets"
              element={<Products type={ProductType.tablets} title="Tablets" />}
            />

            <Route
              path="/accessories"
              element={
                <Products type={ProductType.accessories} title="Accessories" />
              }
            />

            <Route path="/menu" element={<PageMenu />} />

            <Route
              path="/favorites"
              element={
                <Favorites
                  title={'Favorites'}
                  type={[
                    ProductType.accessories,
                    ProductType.phones,
                    ProductType.tablets,
                  ]}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <Cart
                  title={'Cart'}
                  type={[
                    ProductType.accessories,
                    ProductType.phones,
                    ProductType.tablets,
                  ]}
                />
              }
            />

            <Route
              path="/phones/:productId"
              element={<ProductDetails title={''} type={ProductType.phones} />}
            />

            <Route
              path="/tablets/:productId"
              element={<ProductDetails title={''} type={ProductType.tablets} />}
            />

            <Route
              path="/accessories/:productId"
              element={
                <ProductDetails title={''} type={ProductType.accessories} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </HashRouter>
    </Provider>
  );
};
