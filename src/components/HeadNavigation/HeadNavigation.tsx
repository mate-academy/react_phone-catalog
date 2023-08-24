import React from 'react';
import './HeadNavigation.scss';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import logo from '../../Icons/logo.svg';
import { Search } from '../Search/Search';
import { Phone } from '../../types/Phone';
import { CartItem } from '../../types/CartItem';

type Props = {
  likedProducts: Phone[],
  cartProducts: CartItem[],
};

export const HeadNavigation: React.FC<Props> = ({
  likedProducts,
  cartProducts,
}) => {
  return (
    <div className="head-navigation">
      <div className="head-navigation__elemets">
        <Link to="/home" className="head-navigation__logo">
          <img src={logo} alt="logo" />
        </Link>

        <NavLink
          to="/"
          className={({ isActive }) => classNames('head-navigation__element', {
            'head-navigation__element--active': isActive,
          })}
        >
          home
        </NavLink>

        <NavLink
          to="/phones"
          className={({ isActive }) => classNames('head-navigation__element', {
            'head-navigation__element--active': isActive,
          })}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={({ isActive }) => classNames('head-navigation__element', {
            'head-navigation__element--active': isActive,
          })}
        >
          tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={({ isActive }) => classNames('head-navigation__element', {
            'head-navigation__element--active': isActive,
          })}
        >
          accessories
        </NavLink>
      </div>

      <div className="head-navigation__left">
        <Search />

        <div className="elements-border">
          <NavLink
            to="/favourites"
            className={({ isActive }) => classNames('icon icon--fav', {
              'icon--fav--active': isActive,
            })}
          >
            {!!likedProducts.length && (
              <div className="counter">{likedProducts.length}</div>
            )}
          </NavLink>
        </div>

        <div className="elements-border">
          <NavLink
            to="/shoppingBag"
            className={({ isActive }) => classNames('icon icon--bag', {
              'icon--bag--active': isActive,
            })}
          >
            {!!cartProducts.length && (
              <div className="counter">{cartProducts.length}</div>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
