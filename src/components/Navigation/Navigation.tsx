import { NavLink } from 'react-router-dom';
import { getLinkActiveClass } from '../../helpers/getLinkActiveClass';
import './Navigation.scss';

type Props = {
  handleClick?: () => void;
};

export const Navigation: React.FC<Props> = ({ handleClick }) => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) => getLinkActiveClass(
              'navigation__link', isActive,
            )}
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            to="/phones"
            className={({ isActive }) => getLinkActiveClass(
              'navigation__link', isActive,
            )}
            onClick={handleClick}
          >
            Phones
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            to="/tablets"
            className={({ isActive }) => getLinkActiveClass(
              'navigation__link', isActive,
            )}
            onClick={handleClick}
          >
            Tablets
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            to="/accessories"
            className={({ isActive }) => getLinkActiveClass(
              'navigation__link', isActive,
            )}
            onClick={handleClick}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
