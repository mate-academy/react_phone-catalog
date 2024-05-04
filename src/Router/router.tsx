import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import React from 'react';
import { Products } from '../components/componentProducts/productComponent';
import { HomePage } from '../components/HomePage/homePage';
import { Provider } from 'react-redux';
import store from '../store/store';
import { ProductType } from '../services/enums';
// eslint-disable-next-line max-len
import { ProductDetails } from '../components/ProductDetail/ComponentProductDetail';
import { Favorites } from '../components/Favorites/FavoritesComponent';
import { Cart } from '../components/Cart/Cart';
import { NotFoundPage } from '../components/notFoundPage/ComponentNotFound';

export const Root = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
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
            path="/phones/details/"
            element={<ProductDetails title={''} />}
          />

          <Route
            path="/tablets/details/"
            element={<ProductDetails title={''} />}
          />

          <Route
            path="/accessories/details/"
            element={<ProductDetails title={''} />}
          />

          <Route path="/details" element={<ProductDetails title={''} />} />

          {/* <Route
            path="/details/:id"
            element={
              <ProductDetails type={ProductType.phones} title="Phone Details" />
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProductDetails
                type={ProductType.tablets}
                title="Tablet Details"
              />
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProductDetails
                type={ProductType.accessories}
                title="Accessory Details"
              />
            }
          /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};
