import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './HeaderNav.module.scss';
import { useMenu } from '../Menu/MenuContext';
import { closeMenu } from 'modules/shared/helpers/handlers';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navbarLink, {
    [styles.linkActive]: isActive,
  });

export const HeaderNav = () => {
  const { isMenuOpen, toggleMenu } = useMenu();

  return (
    <nav
      className={classNames(styles.navbar, { [styles.menuOpen]: isMenuOpen })}
    >
      <NavLink
        to="/"
        className={getLinkClass}
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        Home
      </NavLink>

      <NavLink
        to="/phones"
        className={getLinkClass}
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        Phones
      </NavLink>

      <NavLink
        to="/tablets"
        className={getLinkClass}
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        Tablets
      </NavLink>

      <NavLink
        to="/accessories"
        className={getLinkClass}
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        Accesories
      </NavLink>
    </nav>
  );
};
