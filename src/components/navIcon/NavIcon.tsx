/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */

import classNames from 'classnames';
import { Categories } from '../../types/Product';
import { useAppSelector } from '../../utils/hooks';

import styles from './NavIcon.module.scss';

interface Props {
  type: 'favorite' | 'cart';
}

export const NavIcon: React.FC<Props> = ({ type }) => {
  const count =
    type === 'favorite'
      ? useAppSelector(state => state.favorites.data).length
      : useAppSelector(state => state.cart.data).reduce(
        (
          sum: number,
          item: { id: string; count: number; category: Categories },
        ) => sum + item.count,
        0,
      );

  return (
    <div className={classNames(styles.navIcon, styles[`navIcon--${type}`])}>
      {count !== 0 && <div className={styles.navIcon__count}>{count}</div>}
    </div>
  );
};
