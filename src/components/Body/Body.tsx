import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Catalog } from './../../pages/Catalog';
import { Home } from './../../pages/HomePage';
import { Cart } from './../../pages/Cart';
import { Favourites } from './../../pages/Favourites';
import { ProductPage } from './../../pages/ProductPage';
import { NotFoundPage } from './../../pages/NotFoundPage';

type BodyProps = {
  goods: Good[];
}

export const Body: React.FC<BodyProps> = ({ goods }) => {

  return (
    <main className="main">
      <div className="main-container">
        <Switch>
          <Route path="/" exact render={() => <Home goods={goods} />} />

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
            <Catalog goods={goods} />
          </Route>

          <Route path="/:section/:goodId" exact>
            <ProductPage goods={goods} />
          </Route>
        </Switch>
      </div>
    </main>
  )
}

 /*
 export const Body: React.FC<BodyProps> = ({ goods }) => {
 const routes = [
    {
      path: '/',
      component: Home,
    },
    {
      path: "/phones",
      component: Catalog,
     routes: [
        {
          path: '/phones/:phoneId',
          component: 'Details'
        }
      ]
    },
    {
      path: '/tablets',
      component: 'Tablets',
      routes: [
        {
          path: '/tablets/:tabletId',
          component: 'Details'
        }
      ]
    },
    {
      path: '/accessories',
      component: 'Accessories',
      routes: [
        {
          path: '/accessories/:accessoryId',
          component: 'Details'
        }
      ]
    },
  ]

 const routeComponents = routes.map(({path, component}, key) =>
    (
      <Route exact path={path} key={key} component={component} />
    ))
 return (
    <main className="main">
    <Switch>
      {routeComponents}
    </Switch>
    </main>
  )
 }
*/






/*
</Route>
              <Route path="/phones">
                <Catalog
                  goods={goods}
                />
              </Route>

              <Route path="/tablets">
                <Catalog
                  goods={goods}
                />
              </Route>

              <Route path="/accessories">
                <Catalog
                  goods={goods}
                />
              </Route>

              <Route path="/favourites">
                <Favourites
                  goods={goods}
                />
              </Route>
*/
