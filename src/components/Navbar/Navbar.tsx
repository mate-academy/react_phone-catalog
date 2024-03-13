import { Link, NavLink } from 'react-router-dom';
import { ICONS } from '../../images/icons/icons';
import { getLinkClass } from '../../helpers/getLinkClass';

export const Navbar = () => {
  return (
    <nav className="header__left-side__navigation">
      <ul className="header__left-side__navigation--list">
        <li>
          <Link
            to="/"
            className="header__left-side__navigation--logo--link"
          >
            <img
              src={ICONS.logo}
              alt="Logo"
              className="header__left-side__navigation--logo"
            />
          </Link>
        </li>
        <li className="header__left-side__navigation--item">
          <NavLink
            to="/"
            className={getLinkClass}
          >
            Home
          </NavLink>
        </li>
        <li className="header__left-side__navigation--item">
          <NavLink
            to="/phones"
            className={getLinkClass}
          >
            Phones
          </NavLink>
        </li>
        <li className="header__left-side__navigation--item">
          <NavLink
            to="/tablets"
            className={getLinkClass}
          >
            Tablets
          </NavLink>
        </li>
        <li className="header__left-side__navigation--item">
          <NavLink
            to="/accessories"
            className={getLinkClass}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
