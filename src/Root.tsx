import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './Pages/Home';
import { Phones } from './Pages/Cart/Phones/Phones';
import { Tablets } from './Pages/Tablets/Tablets';
import { Accessories } from './Pages/Accessories/Accessories';
import { PageNotFound } from './Pages/PageNotFound';
import { Favourites } from './Pages/Favourites';
import { Cart } from './Pages/Cart/Cart';
import { CartProvider } from './CartContext/CartProvider';
import { PhoneDetails } from './Pages/PhoneDetails/PhoneDetails';
import { TabletDetails } from './Pages/Tablets/TabletsDetails';
import { AccessoryDetails } from './Pages/Accessories/AccessoriesDetails';
export const Root: React.FC = () => (
  <CartProvider>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="home"
            element={<Navigate to="/" />}
          />

          <Route
            path="phones"
            element={<Phones />}
          />
          <Route
            path="phones/:id"
            element={<PhoneDetails />}
          />

          <Route
            path="tablets"
            element={<Tablets />}
          />
          <Route
            path="tablets/:id"
            element={<TabletDetails />}
          />

          <Route
            path="accessories"
            element={<Accessories />}
          />
          <Route
            path="accessories/:id"
            element={<AccessoryDetails />}
          />

          <Route
            path="favourites"
            element={<Favourites />}
          />
          <Route
            path="cart"
            element={<Cart />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Route>
      </Routes>
    </Router>
  </CartProvider>
);
