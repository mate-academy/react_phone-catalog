import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './navigation.scss';

const getActiveLink = ({ isActive }: { isActive: boolean }) => classNames(
  'nav__link', { 'nav__link--active': isActive },
);

type Props = {
  // eslint-disable-next-line react/require-default-props
  isShower?: boolean;
};

export const Navigation: React.FC<Props> = ({ isShower = false }) => {
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
            {isShower && (
              // need add logic for search
              <label
                className="nav__personally--container"
                htmlFor="mySearch"
              >
                <input
                  type="text"
                  placeholder="Search in phones..."
                  id="mySearch"
                  className="nav__personally--search"
                />

                <div className="icon nav__personally--icon" />
              </label>
            )}
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
