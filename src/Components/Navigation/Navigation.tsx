/* eslint-disable react/require-default-props */
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './navigation.scss';
import { Search } from '../Search/Search';

const getActiveLink = ({ isActive }: { isActive: boolean }) => classNames(
  'nav__link', { 'nav__link--active': isActive },
);

type Props = {
  searchQuery?: string;
  setSearchQuery?: (v: string) => void;
};

export const Navigation: React.FC<Props> = ({
  searchQuery = '',
  setSearchQuery = () => {},
}) => {
  return (
    <header>
      <nav>
        <div className="nav">
          <div className="nav__personally">
            <NavLink
              to="/"
              className="nav__link icon icon__logo"
            />

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
            />

            <NavLink
              to="/Shopping"
              className={({ isActive }) => classNames(
                'nav__link icon icon__shopping',
                {
                  'icon__shopping--active': isActive,
                },
              )}
            />

          </div>
        </div>
      </nav>
    </header>
  );
};
