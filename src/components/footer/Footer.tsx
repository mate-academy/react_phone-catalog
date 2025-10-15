import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <a className="logo footer__logo" href="#">
          <img
            className="logo__image"
            alt="logo"
            src="../../../public/img/general/icons/logo-bottom.svg"
          />
        </a>
        <nav className="footer__navigation">
          <ul className="footer__list">
            <li className="footer__item">
              <a href="#" className="footer__link text-uppercase">
                Github
              </a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link text-uppercase">
                Contacts
              </a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link text-uppercase">
                rights
              </a>
            </li>
          </ul>
        </nav>
        <a className="footer__button" href="#">
          <p className="footer__text-button text-small">Back to top</p>
          <div className="footer__icon-wrapper button">
            <img
              className="footer__icon"
              alt="up-arrow"
              src="../../../public/img/general/icons/arrow-white.svg"
            />
          </div>
        </a>
      </div>
    </footer>
  );
};
