import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  NavLink,
  Route,
  HashRouter,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import PhonesPage from './PhonesPage';
import TabletsPage from './TabletsPage';
import AccessoriesPage from './AccessoriesPage';
import Favs from './Favs';
import { RootState, getFavs, getCart } from '../store';
import Cart from './Cart';

type Props = {
  favs: any;
  cart: any;
};

const Header: FC<Props> = ({ favs, cart }) => {
  return (
    <HashRouter>
      <nav className="nav">
        <img
          src="img/logo.svg"
          alt="Logo"
          className="nav__logo"
        />
        <ul className="nav__links">
          <NavLink
            to="/"
            exact
            activeClassName="nav__selected"
            className="nav__items"
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            activeClassName="nav__selected"
            className="nav__items"
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            activeClassName="nav__selected"
            className="nav__items"
          >
            Tablets
          </NavLink>
          <NavLink
            to="accessories"
            activeClassName="nav__selected"
            className="nav__items"
          >
            Accessories
          </NavLink>
        </ul>
        <div className="nav__fav-cart-container">
          <NavLink
            to="/favs"
            activeClassName="nav__selected--1"
            className="nav__items"
          >
            {
              favs.length
                ? (
                  <>
                    <div className="nav__counter">
                      {favs.length}
                    </div>
                    <img
                      src="img/favs.svg"
                      alt="Favorites"
                      className="nav__favs"
                    />
                  </>
                )
                : (
                  <img
                    src="img/favs.svg"
                    alt="Favorites"
                    className="nav__favs"
                  />
                )
            }
          </NavLink>
          <NavLink
            to="/cart"
            activeClassName="nav__selected--1"
            className="nav__items"
          >
            {
              cart.length
                ? (
                  <>
                    <div className="nav__counter">
                      {cart.length}
                    </div>
                    <img
                      src="img/cart.svg"
                      alt="Cart"
                      className="nav__cart"
                    />
                  </>
                )
                : (
                  <img
                    src="img/cart.svg"
                    alt="Cart"
                    className="nav__cart"
                  />
                )
            }
          </NavLink>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/phones" exact component={PhonesPage} />
        <Route path="/tablets" exact component={TabletsPage} />
        <Route path="/accessories" exact component={AccessoriesPage} />
        <Route path="/favs" exact component={Favs} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </HashRouter>
  );
};

const mapState = (state: RootState) => ({
  favs: getFavs(state),
  cart: getCart(state),
});

export default connect(mapState)(Header);
