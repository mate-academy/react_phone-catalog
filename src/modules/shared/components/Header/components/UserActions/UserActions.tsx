import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './UserActions.module.scss';
import headerStyles from '../../Header.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.icon, {
    [headerStyles.linkActive]: isActive,
  });

export const UserActions = () => {
  return (
    <div className={styles.userActions}>
      <NavLink to="/favourites" className={getLinkClass}>
        <img src="img/icons/heart.svg" alt="Favourites" />
      </NavLink>

      <NavLink to="/cart" className={getLinkClass}>
        <img src="img/icons/cart.svg" alt="Cart" />
      </NavLink>
    </div>
  );
};
