import React, { FC, useContext } from 'react';
import './Favourites.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { ItemsCount } from '../ItemsCount';

export const Favourites: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const { favourites } = useContext(ProductsContext);

  return (
    <div
      className={classNames('favourites', {
        'favourites--mobile': isMobile,
      })}
    >
      <NavLink to="favourites" className="favourites__link">
        <img
          src="../../../img/favourites.svg"
          alt="Fvourites items"
          className="favourites__image"
        />
        {favourites.length > 0 && <ItemsCount count={favourites.length} />}
      </NavLink>
    </div>
  );
};
