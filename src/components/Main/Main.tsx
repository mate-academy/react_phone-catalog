import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Main.scss';
import { HomePage } from './HomePage/HomePage';
import { PhonesPage } from '../../pages/PhonesPage/PhonesPage';
import { ProductPage } from '../../pages/ProductPage/ProductPage';

type Props = {
  productsBrand: Product[];
  productsHot: Product[];
  fullProductList: Product[];
};

export const Main: React.FC<Props> = (
  {
    productsBrand,
    productsHot,
    fullProductList,
  },
) => {
  return (
    <main className="main">
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <HomePage
              brandList={productsBrand}
              hotList={productsHot}
              fullList={fullProductList}
            />
          )}
        />
        <Route
          path="/phones"
          key="phone"
          render={() => (
            <PhonesPage
              type="phone"
              text="Mobile phones"
            />
          )}
        />
        <Route
          path="/tablets"
          key="tablet"
          render={() => (
            <PhonesPage
              type="tablet"
              text="Tablets"
            />
          )}
        />
        <Route
          path="/accessories"
          key="accessories"
          render={() => (
            <PhonesPage
              text="Accessories"
              type="accessories"
            />
          )}
        />
        <Route
          path="/product/:productId"
          render={() => <ProductPage />}
        />
        <Route path="/favorite" render={() => <h1>Favorite page</h1>} />
        <Route path="/cart" render={() => <h1>Cart page</h1>} />
      </Switch>
    </main>
  );
};
