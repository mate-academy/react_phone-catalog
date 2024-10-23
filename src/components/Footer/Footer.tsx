import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__line"></div>

      <div className="footer__flex">
        <img className="footer__logo" src="./img/Logo.png" alt="Logo" />

        <div className="footer__about-us">
          <a
            target="_blanket"
            href="https://github.com/jdifek"
            className="footer__text"
          >
            GITHUB
          </a>
          <a
            target="_blanket"
            href="https://github.com/jdifek"
            className="footer__text"
          >
            CONTACTS
          </a>
          <a
            target="_blanket"
            href="https://github.com/jdifek"
            className="footer__text"
          >
            RIGHTS
          </a>
        </div>

        <div className="footer__slide">
          <p
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="footer__slide-text"
          >
            Back to top
          </p>
          <img
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="footer__slide-button"
            src="./img/Footer-slide.svg"
            alt="Footer-slide"
          />
        </div>
      </div>
    </footer>
  );
};
