import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavMap.scss';

type Props = {
  nameProduct?: string
};

export const NavMap: React.FC<Props> = ({ nameProduct }) => {
  const location = useLocation();
  const categoryLabel = location.pathname.split('/')[1][0].toLocaleUpperCase()
    + location.pathname.split('/')[1].slice(1);
  const categoryLink = location.pathname.split('/')[1];

  return (
    <nav className="nav-map">
      <div className="nav-map__header">
        <NavLink
          className="nav-map__link"
          to="/"
        >
          <div className="icon icon__home" />
        </NavLink>

        <div
          className="icon icon__arrow-secondary icon__arrow-secondary--rigth"
        />

        {
          nameProduct ? (
            <NavLink
              className="nav-map__link"
              to={`/${categoryLink}`}
            >
              {categoryLabel}
            </NavLink>
          ) : (
            <p
              className="nav-map__label"
            >
              {categoryLabel}
            </p>
          )
        }

        {nameProduct && (
          <>
            <div
              className="
                icon
                icon__arrow-secondary
                icon__arrow-secondary--rigth
              "
            />

            <p
              className="nav-map__label"
            >
              {nameProduct}
            </p>
          </>
        )}
      </div>

      {nameProduct && (
        <div className="nav-map__bottom">
          <div
            className="icon icon__arrow-primary icon__arrow-secondary--left"
          />

          <NavLink
            className="nav-map__link"
            to={`/${categoryLink}`}
          >
            Back
          </NavLink>
        </div>
      )}

    </nav>
  );
};

NavMap.defaultProps = {
  nameProduct: undefined,
};
