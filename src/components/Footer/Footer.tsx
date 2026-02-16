import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <Link to="/">
          <img
            src="./public/img/Logo-white.svg"
            alt="logo"
            className="footer__logo"
          />
        </Link>

        <div className="footer__contacts">
          <a
            rel="noreferrer"
            href="https://github.com/wzfxc"
            className="footer__contacts-link"
            target="_blank"
          >
            Github
          </a>
          <a
            rel="noreferrer"
            href="mailto:maksohrimenko1@gmail.com"
            className="footer__contacts-link"
            target="_blank"
          >
            Contacts
          </a>
          <a
            rel="noreferrer"
            href="#"
            className="footer__contacts-link"
            target="_blank"
          >
            Rights
          </a>
        </div>

        <div className="footer__navigation">
          <div className="footer__navigation-title" onClick={handleScrollToTop}>
            Back to top
          </div>
          <button
            className="footer__navigation-button"
            onClick={handleScrollToTop}
            type="button"
          />
        </div>
      </div>
    </footer>
  );
};
