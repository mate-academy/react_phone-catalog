import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './Navigation.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => cn(
  'nav__link', {
  'nav__link-active': isActive,
});

export const Navigation: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/" className={getLinkClass}>
            HOME
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink to="/phones" className={getLinkClass}>
            PHONES
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink to="/tablets" className={getLinkClass}>
            TABLETS
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink to="/accessories" className={getLinkClass}>
            ACCESSORIES
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
