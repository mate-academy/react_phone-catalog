import React, { FC, useCallback } from 'react';
import './_Navigation.scss';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setQuery } from '../../store/actionCreators';
import imageHeart from '../../assets/header/heart.svg';
import {
  CartInterface,
  FavouritesState,
  CartState,
} from '../../constants/types';
import { getCart } from '../../store/reducers/cartReducer';
import { getFavourites } from '../../store/reducers/favouritesReducer';

interface Props {
  setQuery: (value: string) => void;
  cart: CartInterface[];
  favourites: string[];
}

export const NavigationTemplate: FC<Props> = (props) => {
  const {
    setQuery: setQueryTemplate,
    favourites,
    cart,
  } = props;

  const searchWithDelay = useCallback(
    debounce(setQueryTemplate, 200),
    [],
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    searchWithDelay(value.toLowerCase());
  };

  return (
    <nav className="nav">
      <ul className="nav__list-left">
        <li className="nav__item">
          <NavLink
            className="nav__link-left"
            to="/"
            activeClassName="nav__link-left--active"
            exact
          >
                  home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className="nav__link-left"
            to="/phones"
            activeClassName="nav__link-left--active"
          >
                phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className="nav__link-left"
            to="/tablets"
            activeClassName="nav__link-left--active"
            exact
          >
                tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className="nav__link-left"
            to="/accessories"
            activeClassName="nav__link-left--active"
            exact
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
            onChange={handleSearch}
          />
        </li>
        <li className="nav__item-right box-fav-rel">
          <NavLink
            className="nav__link-right"
            to="/favourites"
            activeClassName="nav__link-right--active"
          >
            <img
              src={imageHeart}
              alt="link_to_favourites"
              className="nav__favourites"
            />
            {favourites.length > 0 && (
              <span className="nav__red-circle">{favourites.length}</span>
            )}
          </NavLink>
        </li>
        <li className="nav__item-right box-cart-rel">
          <NavLink
            className="nav__link-right"
            to="/cart"
            activeClassName="nav__link-right--active"
          >
            <img
              src="/img/header/shopcart.svg"
              alt="link_to_cart"
              className="nav__store"
            />
            {cart.length > 0 && (
              <span className="nav__red-circle">{cart.length}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: {
  favouritesReducer: FavouritesState;
  cartReducer: CartState;
}) => ({
  favourites: getFavourites(state.favouritesReducer),
  cart: getCart(state.cartReducer),
});

const mapDispatchToProps = { setQuery };

// eslint-disable-next-line max-len
export const Navigation = connect(mapStateToProps, mapDispatchToProps)(NavigationTemplate);
