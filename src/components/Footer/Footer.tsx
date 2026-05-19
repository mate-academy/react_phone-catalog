/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React, { useState } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { Checkout } from '../Checkout';

export const Footer: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const scrollToTop = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.preventDefault;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  function handleShowMessage(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }

  return (
    <footer className="footer">
      <div className="wrapper footer__container">
        <Link to="/" className="footer__logo" onClick={e => scrollToTop(e)}>
          <img
            src={require('../../images/icons/Logo.svg').default}
            alt="Logo"
          />
        </Link>

        <nav className="footer__nav nav">
          <a
            href="https://github.com/netzelnatalia/react_phone-catalog"
            className="footer__nav-link nav__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>

          <a
            href="/"
            className="footer__nav-link nav__link"
            onClick={e => handleShowMessage(e)}
          >
            Contacts
          </a>

          <a
            href="/"
            className="footer__nav-link nav__link"
            onClick={e => handleShowMessage(e)}
          >
            Rights
          </a>
        </nav>

        <button
          type="button"
          className="footer__scroll"
          onClick={e => scrollToTop(e)}
        >
          <span className="footer__scroll-text">Back to top</span>

          <img
            className="footer__scroll-icon"
            src={require('../../images/icons/scroll-top.svg').default}
            alt="Logo"
          />
        </button>
      </div>

      {showMessage && <Checkout setShowMessage={setShowMessage} />}
    </footer>
  );
};
