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

export const NavIcon = ({ path, type, isMenu }: Props) => {
  const { likedProducts, cartProducts, countProductsMap } =
    useProductsContext();

  let count = 0;

  if (type === 'favourite') {
    count = likedProducts.length;
  } else {
    count = cartProducts.reduce((total, productId) => {
      const productCount = countProductsMap[productId] || 1;

      return total + productCount;
    }, 0);
  }

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
