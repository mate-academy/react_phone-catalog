import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <img className="footer__logo" src="/img/logo-img.svg" alt="logo image" />
      <div className="footer__container">
        <nav className="footer__nav">
          <Link to="/" className="footer__link footer__link--home">
            GITHUB
          </Link>
          <Link to="#" className="footer__link">
            CONTACTS
          </Link>
          <Link to="#" className="footer__link">
            RIGHTS
          </Link>
        </nav>
      </div>
      <div className="footer__button">
        <p className="footer__button--text">Back to top</p>
        <button className="footer__button--back-to-top">
          <img src="/img/icons/arrow-up.svg" alt="arrow up" className='footer__button--arrow-up' />
        </button>
      </div>
    </footer>
  );
};
