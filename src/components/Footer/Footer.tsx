import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import './footer.scss';

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
                  to="/github"
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
                  to="/contacts"
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
                  to="/rights"
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

          <button
            type="button"
            className="footer__backToTop icon"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};
