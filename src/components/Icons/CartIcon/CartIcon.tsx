export * from './CartIcon';

import { NavLink } from 'react-router-dom';

import styles from '../icons.module.scss';

interface CartIconProps {
  className?: string;
  cartItens?: number;
  onClick?: () => void;
}

export const CartIcon = ({
  className,
  cartItens = 0,
  onClick,
}: CartIconProps) => {
  return (
    <NavLink
      to="/cart"
      className={`${styles.iconButton} ${className ?? ''}`}
      onClick={onClick}
    >
      <img src="./icons/ShoppingBagCart.svg" alt="Carrinho" />
      {cartItens > 0 && (
        <span className={styles.iconButton__value}>{cartItens}</span>
      )}
    </NavLink>
  );
};
