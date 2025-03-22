import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

import { useMenuContext } from 'contexts/MenuContext';
import { closeMenu } from 'shared/helpers/handlers';

import styles from './HeaderNav.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navbarLink, {
    [styles.linkActive]: isActive,
  });

export const HeaderNav: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();

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
        Accessories
      </NavLink>
    </nav>
  );
};
