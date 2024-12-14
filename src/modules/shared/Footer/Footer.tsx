import React from 'react';
import './Footer.scss';

export const Footer: React.FC = () => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Плавная прокрутка
    });
  };

  return (
    <div className="footer">
      <div className="footer__container">
        <a href="#" className="footer__logo">
          <img src="logo.svg" alt="Nice Gadgets" className="footer__logo" />
        </a>

        <div className="footer__items">
          <a href="#" className="footer__link">
            Github
          </a>
          <a href="#" className="footer__link">
            Contacts
          </a>
          <a href="#" className="footer__link">
            rights
          </a>
        </div>

        <div className="footer__block">
          <span className="footer__button-title">Back to top</span>
          <button className="footer__button" onClick={backToTop}></button>
        </div>
      </div>
    </div>
  );
};
