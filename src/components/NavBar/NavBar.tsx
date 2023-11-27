import { FC } from 'react';
import './NavBar.scss';

export const NavBar: FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <a
            href="/"
            className="navbar__link navbar__link--active"
          >
            home
          </a>
        </li>

        <li className="navbar__item">
          <a href="/" className="navbar__link">
            phones
          </a>
        </li>

        <li className="navbar__item">
          <a href="/" className="navbar__link">
            tablets
          </a>
        </li>

        <li className="navbar__item">
          <a
            href="/"
            className="navbar__link"
          >
            accessories
          </a>
        </li>
      </ul>
    </nav>
  );
};
