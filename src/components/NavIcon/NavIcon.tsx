import React from 'react';
import styles from './NavIcon.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';
import cn from 'classnames';
import { useProductsContext } from '../../hooks/savedProducts';
import classNames from 'classnames';

type Props = {
  path: string;
  type: 'favourite' | 'cart';
  isMenu?: boolean;
};

export const NavIcon: React.FC<Props> = ({ path, type, isMenu }) => {
  const { likedProducts, cartProducts } = useProductsContext();

  const count =
    type === 'favourite' ? likedProducts.length : cartProducts.length;

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(styles.navIcon, { [styles['is-active']]: isActive })
      }
    >
      <Icon type={type} />
      {count > 0 && (
        <div
          className={classNames(styles.count, { [styles.countMenu]: isMenu })}
        >
          <span className={styles.count__number}>{count}</span>
        </div>
      )}
    </NavLink>
  );
};
