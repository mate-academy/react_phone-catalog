import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="logo">
            <NavLink to="/" className="logo__link">
              <img
                src="./images/LOGO.svg"
                alt="logo"
                className="logo__img"
              />
            </NavLink>
          </div>

          <nav className="navigation">
            <ul className="navigation__list">

              <li className="navigation__item">
                <a
                  href="https://github.com/danulyk05"
                  className="navigation__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
              <li className="navigation__item">
                <a
                  href="https://github.com/danulyk05"
                  className="navigation__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contacts
                </a>
              </li>
              <li className="navigation__item">
                <a href="/" className="navigation__link">rights</a>
              </li>
            </ul>
          </nav>

          <div className="footer__backTop">
            <div className="footer__textBack">Back to top</div>
            <button
              type="button"
              className="footer__button"
              onClick={handleScrollToTop}
            >
              <img src="./images/icons/ArrowTop.svg" alt="back to top" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
