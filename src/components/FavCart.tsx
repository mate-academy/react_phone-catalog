import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import '../styles/FavCart.scss';

export const FavCart: React.FC = () => {
  const getFavLinkClass = ({ isActive }: { isActive: boolean }) => (
    cn('fav-cart__fav-link', { 'fav-cart__fav-link--active': isActive })
  );

  const getCartLinkClass = ({ isActive }: { isActive: boolean }) => (
    cn('fav-cart__cart-link', { 'fav-cart__cart-link--active': isActive })
  );

  return (
    <div className="fav-cart">
      <div className="fav-cart__block">
        <NavLink
          to="/favourites"
          className={getFavLinkClass}
        />
      </div>

      <div className="fav-cart__block">
        <NavLink
          to="/cart"
          className={getCartLinkClass}
        />
      </div>
    </div>
  );
};
