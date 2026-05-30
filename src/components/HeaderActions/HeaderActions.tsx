import styles from './HeaderActions.module.scss';

import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { useUserActions } from '../../context/useUserActions';

import favouriteIcon from '../../images/icons/favourites.svg';
import cartIcon from '../../images/icons/cart.svg';

const getIconClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.headerActions__icon, {
    [styles['headerActions__icon--active']]: isActive,
  });

type Props = {
  onActionClick?: () => void;
};

export const HeaderActions: React.FC<Props> = ({ onActionClick }) => {
  const { favourites, cart } = useUserActions();

  const favouritesCount = useMemo(() => favourites.length, [favourites]);
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  return (
    <ul className={styles.headerActions__iconsList}>
      <li className={styles.headerActions__iconsItem}>
        <NavLink
          className={getIconClass}
          to="/favourites"
          onClick={onActionClick}
        >
          <img
            className={styles.headerActions__iconImg}
            src={favouriteIcon}
            alt="favourites"
          />
          {favouritesCount > 0 && (
            <span className={styles.headerActions__iconCount}>
              {favouritesCount}
            </span>
          )}
        </NavLink>
      </li>
      <li className={styles.headerActions__iconsItem}>
        <NavLink className={getIconClass} to="/cart" onClick={onActionClick}>
          <img
            className={styles.headerActions__iconImg}
            src={cartIcon}
            alt="cart"
          />
          {cartCount > 0 && (
            <span className={styles.headerActions__iconCount}>{cartCount}</span>
          )}
        </NavLink>
      </li>
    </ul>
  );
};
