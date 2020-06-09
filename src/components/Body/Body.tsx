import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Catalog } from './../../pages/Catalog';
import { Home } from './../../pages/HomePage';
import { Cart } from './../../pages/Cart';
import { Favourites } from './../../pages/Favourites';
import { ProductPage } from './../../pages/ProductPage';
import { NotFoundPage } from './../../pages/NotFoundPage';


export const Body = () => {

  return (
    <main className="main">
      <div className="main-container">
        <Switch>

        <Route path="/" exact render={() => <Home />} />

        <Route path="/favourites" exact>
          <Favourites />
        </Route>

        <Route path="/cart" exact>
          <Cart />
        </Route>

        <Route path="/failed" exact>
          <NotFoundPage />
        </Route>

        <Route path="/:section" exact>
          <Catalog />
        </Route>

        <Route path="/:section/:goodId" exact>
          <ProductPage />
        </Route>

        </Switch>
      </div>
    </main>
  )
}

