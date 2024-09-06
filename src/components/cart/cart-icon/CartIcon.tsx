import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './cartIcon.module.scss';

import { BagIcon } from 'ui/icon/BagIcon';

import { useAppSelector } from 'hooks/hook';
import { ROUTES } from 'utils/constants/routes';
import { selectTotalQuantity } from 'store/features/cart/cart.slice';

export const CartIcon: FC = () => {
  const totalQuantity = useAppSelector(selectTotalQuantity);

  return (
    <NavLink
      to={ROUTES.CART}
      title="Cart"
      className={({ isActive }) => cn(styles.cart, isActive && styles.active)}
    >
      <BagIcon />

      {!!totalQuantity && <span className={styles.count}>{totalQuantity}</span>}
    </NavLink>
  );
};
