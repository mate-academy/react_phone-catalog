import React, { useContext } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import '../styles/FavCart.scss';
import { Counter } from './Counter';
import { GlobalContext } from '../GlobalContext';

export const FavCart: React.FC = () => {
  const { favList, cartList } = useContext(GlobalContext);

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
          to="/favorites"
          className={getFavLinkClass}
        >
          {!!favList.length && (
            <Counter quantity={favList.length} />
          )}
        </NavLink>





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
