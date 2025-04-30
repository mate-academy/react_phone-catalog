import { NavLink } from 'react-router-dom';

import cartIcon from 'assets/img/icons/cart.svg';
import heartIcon from 'assets/img/icons/heart.svg';
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
        className={getLinkClass}
        to="/favorites"
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        <img alt="Favorites" className={styles.image} src={heartIcon} />
      </NavLink>

      <NavLink
        className={getLinkClass}
        to="/cart"
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        <img alt="Cart" className={styles.image} src={cartIcon} />
      </NavLink>
    </div>
  );
};
