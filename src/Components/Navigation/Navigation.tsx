import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

type PropTypes = {
  to: string;
  text: string
};

export const PageNavLink: React.FC<PropTypes> = ({ to, text = '' }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'nav__link',
      { 'nav__link--active': isActive },
    )}
    to={to}
  >
    {text}
  </NavLink>
);

export const Navigation = () => {
  return (
    <nav className="nav nav--mob-no-display">
      <ul className="nav__list">
        <li className="nav__item">
          <PageNavLink to="/" text="Home" />
        </li>
        <li className="nav__item">
          <PageNavLink to="/phones" text="Phones" />
        </li>
        <li className="nav__item">
          <PageNavLink to="/tablets" text="Tablets" />
        </li>
        <li className="nav__item">
          <PageNavLink to="/accessories" text="Accessories" />
        </li>
      </ul>
    </nav>
  );
};
