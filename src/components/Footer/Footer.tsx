import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__line"></div>

      <img className="footer__logo" src=",/img/Logo.png" alt="Logo" />

      <div className="footer__about-us">
        <p className="footer__text">GITHUB</p>
        <p className="footer__text">CONTACTS</p>
        <p className="footer__text">RIGHTS</p>
      </div>

      <div className="footer__slide">
        <p className="footer__slide-text">Back to top</p>
        <img
          className="footer__slide-button"
          src="./img/Footer-slide.svg"
          alt="Footer-slide"
        />
      </div>
    </footer>
  );
};
