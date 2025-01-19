import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './MainNav.scss';

export const MainNav = () => {
  const navLinkClass = (props: { isActive: boolean }) =>
    classNames('main-nav__item text-button', {
      'main-nav__item--selected': props.isActive,
    });

  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul className="main-nav__list">
        <li>
          <NavLink className={navLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/phones">
            Phones
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/tablets">
            Tablets
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/accessories">
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
