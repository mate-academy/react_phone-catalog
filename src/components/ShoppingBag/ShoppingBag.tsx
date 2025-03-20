import React, { FC, useContext } from 'react';
import './ShoppingBag.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ItemsCount } from '../ItemsCount';
import { ProductsContext } from '../context/ProductsContext';

export const ShoppingBag: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const { cartProducts } = useContext(ProductsContext);

  return (
    <div
      className={classNames('shopping-bag', {
        'shopping-bag--mobile': isMobile,
      })}
    >
      <NavLink to="cart" className="shopping-bag__link">
        <img
          src="../../../img/shopping-bag.svg"
          alt="Shopping bag"
          className="shopping-bag__image"
        />
        {cartProducts.length > 0 && <ItemsCount count={cartProducts.length} />}
      </NavLink>
    </div>
  );
};
