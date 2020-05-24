import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Main.scss';
import { HomePage } from './HomePage/HomePage';

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
        <Route path="/phones" render={() => <h1>Phones page</h1>} />
        <Route path="/tablets" render={() => <h1>Tablets page</h1>} />
        <Route path="/accessories" render={() => <h1>Accessories page</h1>} />
        <Route path="/favorite" render={() => <h1>Favorite page</h1>} />
        <Route path="/cart" render={() => <h1>Cart page</h1>} />
      </Switch>
    </main>
  );
};
