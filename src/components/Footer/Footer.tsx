/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

export const Footer: React.FC = () => {
  const handleTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (

    <footer className="footer-container">
      <div className="footer">
        <div className="footer__content">
          <div className="logo">
            <NavLink
              to="../"
              className="logo__title"
            >
              <img
                src="img/icons/logo.svg"
                alt="logo"
              />
            </NavLink>
          </div>

          <div className="footer__links">
            <a
              // eslint-disable-next-line max-len
              href="https://github.com/dm-sheremetiev/phone-catalog"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a
              // eslint-disable-next-line max-len
              href="https://docs.google.com/document/d/1Sbe28D2ksqbdBdx4ZJaUED9uKdRoLKTMvg-syd2LrSA/edit?usp=sharing"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Contacts
            </a>
            <a
              // eslint-disable-next-line max-len
              href="https://zakon.rada.gov.ua/laws/show/254%D0%BA/96-%D0%B2%D1%80#Text"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Rights
            </a>
          </div>

          <button
            type="button"
            className="footer__back-top back-top"
            onClick={handleTopClick}
          >
            <p className="back-top__title">Back to top</p>
            <img
              src="img/icons/arrow-up.svg"
              alt="top arrow"
              className="back-top__image"
            />
          </button>
        </div>
      </div>
    </footer>

  );
};
