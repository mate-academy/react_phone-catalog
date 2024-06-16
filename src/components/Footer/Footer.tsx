import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container ">
      <Link to="/" className="icon icon--footer-logo container">
        <img src="nav/logo.svg" alt="logo" />
      </Link>

      <ul className="footer__ul container">
        <li className="footer__list">
          <Link to="/" className="footer__link">
            GitHub
          </Link>
        </li>
        <li className="footer__list">
          <Link to="/" className="footer__link">
            Contacts
          </Link>
        </li>
        <li className="footer__list">
          <Link to="/" className="footer__link">
            Rights
          </Link>
        </li>
      </ul>

      <div className="footer__top container">
        <span className="footer__text">Back to top</span>
        <Link to="/" className="icon icon--chevron" onClick={scrollToTop}>
          <img src="nav/chevron (arrow top).svg" alt="chevron (arrow top)" />
        </Link>
      </div>
      </div>
      </footer>
  );
};
