import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import './footer.scss';
import { ToTopButton } from '../ToTopButton';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/">
            <img src="./logo.svg" alt="logo" />
          </Link>

          <nav className="footer__nav nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="https://github.com/"
                  target="_blank"
                  className={({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )}
                >
                  Github
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="https://github.com/"
                  target="_blank"
                  className={({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )}
                >
                  Contacts
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="https://github.com/"
                  target="_blank"
                  className={({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )}
                >
                  Rights
                </NavLink>
              </li>
            </ul>
          </nav>

          <ToTopButton />
        </div>
      </div>
    </footer>
  );
};
