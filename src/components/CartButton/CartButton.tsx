import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { CartItem } from '../../types/CartItem';

type Props = {
  cartItems: CartItem[];
};

export const CartButton: React.FC<Props> = ({
  cartItems,
}) => {
  return (
    <NavLink
      to="/cart"
      className={({ isActive }) => classNames(
        'header__icon-link',
        { 'header__icon-link--active': isActive },
      )}
    >
      <img
        src="_new/img/icons/cart.svg"
        alt="cart"
      />

      {!!cartItems.length && (
        <span className="header__count">{cartItems.length}</span>
      )}
    </NavLink>
  );
};
