import React, { FC } from 'react';
import './ShoppingBag.scss';
import classNames from 'classnames';

export const ShoppingBag: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  return (
    <div
      className={classNames('shopping-bag', {
        'shopping-bag--mobile': isMobile,
      })}
    >
      <a href="#basket" className="shopping-bag__link">
        <img
          src="../../../img/shopping-bag.svg"
          alt="Shopping bag"
          className="shopping-bag__image"
        />
      </a>
    </div>
  );
};
