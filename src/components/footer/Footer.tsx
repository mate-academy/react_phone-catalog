import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

import { ReactComponent as Logo } from '../../icons/Logo.svg';
import { ReactComponent as ArrowUp } from '../../icons/Chevron (Arrow Up).svg';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="footer">
      <div className="logo-container">
        <Logo className="logo" />
      </div>

      <div className="links">
        <Link
          to="https://github.com/rafmamedov/react_phone-catalog"
          className="footer-link github"
          target="_blank"
        >
          GitHub
        </Link>

        <Link to="/" className="footer-link contacts">Contacts</Link>
        <Link to="/" className="footer-link rights">Rights</Link>
      </div>

      <button
        className="footer-button"
        type="button"
        onClick={scrollToTop}
      >
        <span className="button-text">
          Back to top
        </span>

        <div className="footer-button-container">
          <ArrowUp />
        </div>
      </button>
    </section>
  );
};

export default Footer;
