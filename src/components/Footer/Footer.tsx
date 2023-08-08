/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';
import arrowBtn from '../../images/footer-button.svg';

import './Footer.scss';

export const Footer: React.FC = () => {
  const handlScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="footer__logo" onClick={handlScrollToTop}>
            <img src={logo} alt="logo" />
          </Link>

          <ul className="footer__menu">
            <li className="footer__item">
              <Link to="https://github.com/sheva10barca" target="_blank">
                Github
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/contacts" target="_blank">
                Contacts
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/rights" target="_blank">
                Rights
              </Link>
            </li>
          </ul>

          <div className="footer__button" onClick={handlScrollToTop}>
            <div className="footer__button-text">Back to top</div>
            <div className="footer__button-arrow">
              <button type="button" className="footer__button-btn">
                <img src={arrowBtn} alt="button back to top" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
