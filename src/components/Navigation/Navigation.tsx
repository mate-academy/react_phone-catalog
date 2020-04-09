import React, { FC, useCallback } from 'react';
import './_Navigation.scss';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setQuery } from '../../store/actionCreators';

import imageHeart from '../../assets/header/heart.svg';

interface Props {
  setQuery: (value: string) => void;
}

export const NavigationTemplate: FC<Props> = (props) => {
  const { setQuery: setQueryTemplate } = props;

  const searchWithDelay = useCallback(
    debounce(setQueryTemplate, 300),
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
        <li className="nav__item-right">
          <NavLink
            className="nav__link-right"
            to="/favourites"
            activeClassName="nav__link-right--active"
          >
            <img
              // src="/img/header/heart.svg"
              src={imageHeart}
              alt="link_to_favourites"
              className="nav__favourites"
            />
          </NavLink>
        </li>
        <li className="nav__item-right">
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
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const mapDispatchToProps = { setQuery };

export const Navigation = connect(null, mapDispatchToProps)(NavigationTemplate);
