import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './cartIcon.module.scss';

<<<<<<< HEAD
import { ROUTES } from '@utils/constants/routes';

import { BagIcon } from '@ui/icon/BagIcon';
import { selectTotalQuantity } from '@store/features/cart/cart.slice';
import { useAppSelector } from '@hooks/hook';
=======
import { BagIcon } from 'ui/icon/BagIcon';

import { useAppSelector } from 'hooks/hook';
import { ROUTES } from 'utils/constants/routes';
import { selectTotalQuantity } from 'store/features/cart/cart.slice';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2

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
