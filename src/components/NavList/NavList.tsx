import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import './NavList.scss';

type Props = {
  closeMenu: () => void;
  isBurgerVisible: boolean;
};

export const NavList: React.FC<Props> = ({ closeMenu, isBurgerVisible }) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'nav__link nav__link--active' : 'nav__link';
  };

  return (
    <nav className="nav">
      <NavLink to="./" className="nav__logo" onClick={closeMenu}>
        <img src="images/logo.svg" alt="Header Logo" />
      </NavLink>
      <ul
        className={cn('nav__list', {
          'nav__list--active': isBurgerVisible,
        })}
      >
        <li className="nav__item">
          <NavLink to="./" className={getNavLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="./phones"
            className={getNavLinkClass}
            onClick={closeMenu}
          >
            Phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/tablets"
            className={getNavLinkClass}
            onClick={closeMenu}
          >
            Tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/accessories"
            className={getNavLinkClass}
            onClick={closeMenu}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
