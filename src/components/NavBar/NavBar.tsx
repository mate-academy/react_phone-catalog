import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLinkHeader } from '../NavLinkHeader';
import './Navbar.scss';

export const NavBar = () => {
  const [checked, setChecked] = useState(false);
  const location = useLocation();

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
        onChange={() => setChecked(!checked)}
      />

      <label htmlFor="checkbox" className="nav__button-container">
        <div className="nav__button" />
      </label>

      <ul className="nav__list">
        <li className="nav__item">
          <NavLinkHeader type="text" to="/">
            Home
          </NavLinkHeader>
        </li>

        <li className="nav__item">
          <NavLinkHeader type="text" to="phones">
            Phones
          </NavLinkHeader>
        </li>

        <li className="nav__item">
          <NavLinkHeader type="text" to="tablets">
            Tablest
          </NavLinkHeader>
        </li>

        <li className="nav__item">
          <NavLinkHeader type="text" to="accessories">
            Accessories
          </NavLinkHeader>
        </li>
      </ul>
    </nav>
  );
};
