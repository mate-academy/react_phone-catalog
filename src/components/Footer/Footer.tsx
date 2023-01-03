import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="logo">
            <img src="img/main-logo/logo.svg" alt="" />
          </Link>
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className="nav__link"
                >
                  Github
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/phones"
                  className="nav__link"
                >
                  Contacts
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/tablets"
                  className="nav__link"
                >
                  Rights
                </NavLink>
              </li>
            </ul>
          </nav>

          <div
            className="footer__buttons buttons"
          >
            <label
              className="buttons__text"
            >
              Back to top
              <input
                aria-label="backToTopBtn"
                type="button"
                className="button button--up"
                onClick={() => window.scrollTo({
                  top: 0, left: 0, behavior: 'smooth',
                })}
              />
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
};
