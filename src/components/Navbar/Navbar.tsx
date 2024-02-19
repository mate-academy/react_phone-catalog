import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { ICONS } from '../../images/icons/icons';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'upperCase header__left-side__navigation--item--link', {
    'header__left-side__navigation--item--link--active': isActive,
  },
);

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
