import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'nav__link',
  { 'nav__link--is-active': isActive },
);

type Props = {
  isHeader?: boolean;
};

export const Navbar: React.FC<Props> = ({ isHeader }) => {
  const classOfNav = isHeader
    ? 'nav__list--header'
    : 'nav__list--menu';

  return (
    <nav className="nav">
      <ul className={`nav__list ${classOfNav}`}>
        <li className="nav__item">
          <NavLink to="/home" className={getLinkClass}>
            Home
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink to="/tablets" className={getLinkClass}>
            Tablets
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink to="/accessories" className={getLinkClass}>
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
