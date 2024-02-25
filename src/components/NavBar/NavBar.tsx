/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.scss';

export const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn({
    'is-active': isActive,
  });
};

const routes = [
  { path: '/', label: 'Home' },
  { path: '/phones', label: 'Phones' },
  { path: '/tablets', label: 'Tablets' },
  { path: '/accessories', label: 'Accessories' },
];

export const NavBar = () => {
  const [checked, setChecked] = useState(false);

  const location = useLocation();

  const handleCheckedBurger = () => {
    setChecked(prev => !prev);
  };

  useEffect(() => {
    setChecked(false);
  }, [location]);

  return (
    <nav className="nav">
      <input
        id="checkbox"
        type="checkbox"
        className="nav__toggle"
        checked={checked}
        onChange={handleCheckedBurger}
      />

      <label
        htmlFor="checkbox"
        className="nav__button-container"
      >
        <div className="nav__button" />
      </label>

      <ul className="nav__list">
        {routes.map(({ path, label }) => (
          <li key={path} className="nav__link">
            <NavLink
              to={path}
              className={({ isActive }) => getLinkClass({ isActive })}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
