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
            path="/accecories"
            element={
              <Products type={ProductType.accessories} title="Accessories" />
            }
          />
          {/* <Route
            path="/details"
            element={<ProductDetails type={ProductType.phones} title={''} />}
          /> */}

          <Route
            path="/details/phones"
            element={
              <ProductDetails type={ProductType.phones} title="Phone Details" />
            }
          />
          <Route
            path="/details/tablets"
            element={
              <ProductDetails
                type={ProductType.tablets}
                title="Tablet Details"
              />
            }
          />
          <Route
            path="/details/accessories"
            element={
              <ProductDetails
                type={ProductType.accessories}
                title="Accessory Details"
              />
            }
          />
          <Route path="/people">
            {/* <Route index element={<Phones />} /> */}
          </Route>
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </HashRouter>
    </Provider>
  );
};
