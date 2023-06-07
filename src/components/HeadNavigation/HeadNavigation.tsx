import React from 'react';
import './HeadNavigation.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import logo from '../../Icons/logo.svg';
import { Search } from '../Search/Search';
import { Phone } from '../../types/Phone';

type Props = {
  phones: Phone[],
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setSearchResults: React.Dispatch<React.SetStateAction<Phone[]>>,
  setPhones: React.Dispatch<React.SetStateAction<Phone[]>>,
};

export const HeadNavigation: React.FC<Props> = ({
  phones, setSearchResults, setPhones, searchQuery, setSearchQuery,
}) => {
  return (
    <div className="head-navigation">
      <div className="head-navigation__elemets">
        <a href="/" className="head-navigation__logo">
          <img src={logo} alt="logo" />
        </a>

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
        <Search
          phones={phones}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchResults={setSearchResults}
          setPhones={setPhones}
        />

        <div className="elements-border">
          <a href="/favourites" className="icon icon--fav">
            <p hidden>
              favourites
            </p>
          </a>
        </div>

        <div className="elements-border">
          <a href="/shoppingBag" className="icon icon--bag">
            <p hidden>
              shopping Bag
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
