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
        <a className="navigation__link" href="/">
          tablets
        </a>
      </li>
      <li>
        <a className="navigation__link" href="/">
          accessories
        </a>
      </li>
    </ul>
  );
};
