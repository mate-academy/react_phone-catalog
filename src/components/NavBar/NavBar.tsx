import './NavBar.scss';

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  showNavBar: boolean,
  setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>,
};

export const NavBar: React.FC<Props> = ({ showNavBar, setShowNavBar }) => {
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'navbar__item',
      { 'navbar__item--active': isActive },
      { 'navbar__item--mobile': showNavBar },
    );
  };

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <NavLink
        to="/home"
        className={getNavClass}
        onClick={() => setShowNavBar(false)}
      >
        Home
      </NavLink>

      <NavLink
        to="/phones"
        className={getNavClass}
        onClick={() => setShowNavBar(false)}
      >
        Phones
      </NavLink>

      <NavLink
        to="/tablets"
        className={getNavClass}
        onClick={() => setShowNavBar(false)}
      >
        Tablets
      </NavLink>

      <NavLink
        to="/accessories"
        className={getNavClass}
        onClick={() => setShowNavBar(false)}
      >
        Accessories
      </NavLink>

      <div className="navbar__mobile">
        <NavLink
          to="/favouriets"
          className={getNavClass}
          onClick={() => setShowNavBar(false)}
        >
          Favoutiets
        </NavLink>
        <NavLink
          to="/cart"
          className={getNavClass}
          onClick={() => setShowNavBar(false)}
        >
          Cart
        </NavLink>
      </div>
    </nav>
  );
};
