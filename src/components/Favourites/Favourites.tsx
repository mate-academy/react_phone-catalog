import React, { FC } from 'react';
import './Favourites.scss';
import classNames from 'classnames';

export const Favourites: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  return (
    <div
      className={classNames('favourites', {
        'favourites--mobile': isMobile,
      })}
    >
      <a href="#favourites" className="favourites__link">
        <img
          src="../../../img/favourites.svg"
          alt="Fvourites items"
          className="favourites__image"
        />
      </a>
    </div>
  );
};
