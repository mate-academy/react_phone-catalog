import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import favoritesNavIcon from '../../icons/favorites.png';
import cartNavIcon from '../../icons/cart.png';
import logoNavIcon from '../../icons/LOGO.png';
import './NavBarStyles.scss';

const getLinkClass = (
  { isActive }: { isActive: boolean },
) => classNames('navbar__nav-link', {
  'is-active': isActive,
});

export const NavBar:React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">
          <img src={logoNavIcon} className="logo" alt="logo" />
        </Link>

        <nav className="navbar__nav">
          <NavLink to="/" className={getLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            PHONES
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            TABLETS
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            ACCESSORIES
          </NavLink>
        </nav>
      </div>

      <div className="navbar__right">
        <Link to="/" className="navbar__icon">
          <img src={favoritesNavIcon} alt="favorites" className="icon" />
        </Link>
        <Link to="/" className="navbar__icon">
          <img src={cartNavIcon} alt="cart" className="icon" />
        </Link>
      </div>
    </header>
  );
};
