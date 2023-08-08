import { Link, useLocation } from 'react-router-dom';
import {
  useContext,
} from 'react';
import './style.scss';
import classNames from 'classnames';
import { StateContext } from '../Store';
import { getCartItems } from '../../helpers/getCartItems';

export const Cart = () => {
  const { pathname } = useLocation();
  const { cartItems } = useContext(StateContext);
  const itemsInCart = getCartItems(cartItems);

  return (
    <div className="cart">
      <Link
        to="cart"
        className={classNames(
          'cart__link',
          {
            'cart__link--active': pathname === '/cart',
            'cart__link--contain': itemsInCart > 0,
          },
        )}
      >
        {!!itemsInCart && (
          <div className="cart__linkValue">
            {itemsInCart}
          </div>
        )}
      </Link>
    </div>
  );
};
