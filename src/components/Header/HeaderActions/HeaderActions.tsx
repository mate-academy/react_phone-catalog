import { NavLink } from 'react-router-dom';

import styles from './HeaderActions.module.scss';
import { asset } from '../../../utils/paths';

type Props = {
  favouritesCount: number;
  cartCount: number;
};

export const HeaderActions = ({ favouritesCount, cartCount }: Props) => {
  return (
    <>
      <NavLink
        to="/favorites"
        className={`${styles.icon} ${styles.mobileAction}`}
      >
        <span className={styles.iconWrapper}>
          <img src={asset('img/icons/favourites.svg')} alt="favorites" />
          <span className={styles.badge}>{favouritesCount}</span>
        </span>
      </NavLink>
      <NavLink
        to="/cart"
        className={`${styles.icon} ${styles.iconShoppingBag}`}
      >
        <span className={styles.iconWrapper}>
          <img src={asset('img/icons/shopping-bag.svg')} alt="shopping-bag" />
          <span className={styles.badge}>{cartCount}</span>
        </span>
      </NavLink>
    </>
  );
};
