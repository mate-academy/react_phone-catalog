import { NavLink } from 'react-router-dom';
import './Navigation.scss';

export const Navigation = () => {
  return (
    <ul className="navigation">
      <li>
        <NavLink
          to="/"
          className="navigation__link"
        >
          home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="phones"
          className="navigation__link"
        >
          phones
        </NavLink>
      </li>
      <li>
        <NavLink
          to="tablets"
          className="navigation__link"
        >
          tablets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="accessories"
          className="navigation__link"
        >
          accessories
        </NavLink>
      </li>
    </ul>
  );
};
