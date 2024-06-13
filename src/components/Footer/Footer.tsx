import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer container">
      <Link to="/" className="icon icon--footer-logo">
        <img src="nav/logo.svg" alt="logo" />
      </Link>

      <ul className="footer__ul">
        <li className="footer__list">
          <Link to="home" className="footer__link">
            GitHub
          </Link>
        </li>
        <li className="footer__list">
          <Link to="phones" className="footer__link">
            Contacts
          </Link>
        </li>
        <li className="footer__list">
          <Link to="tablets" className="footer__link">
            Rights
          </Link>
        </li>
      </ul>

      <div className="footer__top">
        <span className="footer__text">Back to top</span>
        <Link to="/" className="icon icon--chevron" onClick={scrollToTop}>
          <img src="nav/chevron (arrow top).svg" alt="chevron (arrow top)" />
        </Link>
      </div>
    </footer>
  );
};
