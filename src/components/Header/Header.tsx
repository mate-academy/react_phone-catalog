import * as React from 'react';
import './_Header.scss';
import { NavLink, Switch, Route } from 'react-router-dom';
import { HomePage } from '../HomePage/HomePage';
import { Phones } from '../Phones/Phones';
import { Tablets } from '../Tablets/Tablets';
import { Accessories } from '../Accessories/Accessories';
import { Favourites } from '../Favourites/Favouriets';
import { InCart } from '../InCart/InCart';
// import { NoMatch } from '../NoMatch/NoMatch.';
import { Footer } from '../Footer/Footer';

export const Header = () => (
  <>
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo" id="home" />
        <nav className="nav">
          <ul className="nav__list-left">
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/"
                activeClassName="nav__link--active"
              >
                  home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/phones"
                activeClassName="nav__link--active"
              >
                phones
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/tablets"
                activeClassName="nav__link--active"
              >
                tablets
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/accessories"
                activeClassName="nav__link--active"
              >
                accessories
              </NavLink>
            </li>
          </ul>
          <ul className="nav__list-right">
            <li className="nav__item-input">
              <input
                type="text"
                className="nav__search"
                placeholder="Search....."
              />
            </li>
            <li className="nav__item-right">
              <NavLink className="nav__link" to="/favourites">
                <img
                  src="/img/header/heart.svg"
                  alt="link_to_favourites"
                  className="nav__favourites"
                />
              </NavLink>
            </li>
            <li className="nav__item-right">
              <NavLink className="nav__link" to="/cart">
                <img
                  src="/img/header/shopcart.svg"
                  alt="link_to_cart"
                  className="nav__store"
                />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/phones" component={Phones} exact />
      <Route path="/tablets" component={Tablets} exact />
      <Route path="/accessories" component={Accessories} exact />
      <Route path="/favourites" component={Favourites} exact />
      <Route path="/cart" component={InCart} exact />
      {/* <Route path="/*" component={NoMatch} /> */}
    </Switch>
    <Footer />
  </>

);
