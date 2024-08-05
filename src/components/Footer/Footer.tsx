import { Link } from 'react-router-dom';
import './Footer.scss';
import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <Link to="/" className="footer__logo">
        <img src="img/Logo.svg" alt="Logo" className="footer__logo--pict" />
      </Link>
      <div className="footer__navbar">
        <Link
          to="https://github.com/YuliiaCat"
          className="footer__navbar--link"
          target="_blank"
        >
          Github
        </Link>
        <Link
          to="https://github.com/YuliiaCat"
          className="footer__navbar--link"
          target="_blank"
        >
          Contacts
        </Link>
        <Link
          to="https://github.com/YuliiaCat"
          className="footer__navbar--link"
          target="_blank"
        >
          Rights
        </Link>
      </div>
      <div className="footer__back">
        <p className="footer__back--text">Back to top</p>
        <button
          type="button"
          className="footer__back--icon"
          onClick={scrollToTop}
        >
          <svg className="icon icon-up">
            <use href="img/icons.svg#icon-arrow-up"></use>
          </svg>
        </button>
      </div>
    </footer>
  );
};
