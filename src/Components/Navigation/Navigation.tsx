/* eslint-disable react/require-default-props */
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './navigation.scss';
import { Search } from '../Search/Search';
import { useAppSelector } from '../../app/hooks';

const getActiveLink = ({ isActive }: { isActive: boolean }) => classNames(
  'nav__link', { 'nav__link--active': isActive },
);

type Props = {
  searchQuery?: string;
  setSearchQuery?: (v: string) => void;
};

export const Navigation: React.FC<Props> = ({
  searchQuery = '',
  setSearchQuery = () => { },
}) => {
  const location = useLocation();
  const favourites = useAppSelector(state => state.favourites);
  const cart = useAppSelector(state => state.cart);

  // console.log(location.pathname === '/Menu');

  return (
    <header>
      <nav>
        <div className="nav">
          <div className="nav nav__container">
            <NavLink
              to="/"
              className="nav__link icon icon__logo"
            />
            <div className="nav nav__links">
              <NavLink
                to="/"
                className={getActiveLink}

              >
                Home
              </NavLink>

              <NavLink
                to="/Phones"
                className={getActiveLink}

              >
                Phones
              </NavLink>

              <NavLink
                to="/Tablets"
                className={getActiveLink}

              >
                Tablets
              </NavLink>

              <NavLink
                to="/Accessories"
                className={getActiveLink}

              >
                Accessories
              </NavLink>
            </div>
          </div>
          <div className="nav__personally">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <NavLink
              to="/Favourites"
              className={({ isActive }) => classNames(
                'icon icon__favourites',
                {
                  'icon__favourites--active': isActive,
                },
              )}
            >
              {favourites.length !== 0 && (
                <div className="slected">
                  <span className="slected__text">{`${favourites.length}`}</span>
                </div>
              )}
            </NavLink>

            <NavLink
              to="/Shopping"
              className={({ isActive }) => classNames(
                'icon icon__shopping',
                {
                  'icon__shopping--active': isActive,
                },
              )}
            >
              {cart.length !== 0 && (
                <div className="slected">
                  <span className="slected__text">{`${cart.length}`}</span>
                </div>
              )}
            </NavLink>

            {location.pathname === '/Menu'
              ? (
                <Link
                  to=".."
                  className="icon icon__close"
                />
              )
              : (
                <Link
                  to="/Menu"
                  className="icon icon__menu"
                />
              )}

          </div>
        </div>
      </nav>
    </header>
  );
};
