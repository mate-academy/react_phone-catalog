import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { headerLinks } from '../../../variables/headerLinks';

export const HeaderItems = () => {
  const setActiveClass = ({ isActive }: { isActive: boolean }) => {
    return cn('header__link', { 'header__link--active': isActive });
  };

  return (
    <ul className="header__items">
      {headerLinks.map((link) => (
        <li className="header__item" key={link.id}>
          <NavLink to={link.path} className={setActiveClass}>
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
