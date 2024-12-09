import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getActiveLink = (isActive: { isActive: boolean }) =>
  classNames('nav-link-header', { 'nav-link--active': isActive });

export const NavLinks = () => {
  return (
    <ul className="flex items-center justify-center gap-[32px] xl:gap-[64px]">
      <li>
        <NavLink className={getActiveLink} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={getActiveLink} to="phones">
          Phones
        </NavLink>
      </li>
      <li>
        <NavLink className={getActiveLink} to="tablets">
          Tablets
        </NavLink>
      </li>
      <li>
        <NavLink className={getActiveLink} to="accessories">
          Accessories
        </NavLink>
      </li>
    </ul>
  );
};
