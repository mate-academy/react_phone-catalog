import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

import { useMenuContext } from 'contexts/MenuContext';
import { closeMenu } from 'shared/helpers/handlers';

import styles from './UserActions.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.icon, {
    [styles.linkActive]: isActive,
  });

export const UserActions: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();

  return (
    <div
      className={classNames(styles.userActions, {
        [styles.menuOpen]: isMenuOpen,
      })}
    >
      <NavLink
        to="/favorites"
        className={getLinkClass}
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        <img
          className={styles.image}
          src="img/icons/heart.svg"
          alt="Favorites"
        />
      </NavLink>

      <NavLink
        to="/cart"
        className={getLinkClass}
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        <img className={styles.image} src="img/icons/cart.svg" alt="Cart" />
      </NavLink>
    </div>
  );
};
