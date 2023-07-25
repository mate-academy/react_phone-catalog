import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';
import arrowBtn from '../../images/footer-button.svg';

import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="footer__logo">
            <img src={logo} alt="logo" />
          </Link>

          <ul className="footer__menu">
            <li className="footer__item">
              <Link to="https://github.com/sheva10barca">Github</Link>
            </li>
            <li className="footer__item">
              <Link to="/contacts">Contacts</Link>
            </li>
            <li className="footer__item">
              <Link to="/rights">Rights</Link>
            </li>
          </ul>

          <div className="footer__button">
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
