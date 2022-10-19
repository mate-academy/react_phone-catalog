import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { pathname } = useLocation();

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container container--footer">
        <div className="footer__links">
          <NavLink to="/" className="logo logo--footer" />
          <a
            href="https://github.com/obordiug"
            className="nav__link-footer"
            rel="noopener noreferrer"
            target="_blank"
          >
            Github
          </a>
          <button
            type="button"
            className={
              classNames(
                'footer__backToTopButton',
                { 'footer__backToTopButton--cart': pathname === '/cart' },
              )
            }
            onClick={backToTop}
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};
