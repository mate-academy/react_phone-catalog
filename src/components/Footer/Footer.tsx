import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';
import logo from '../../assets/icons/Logo.svg';
import {
  ReactComponent as ArrowUp,
} from '../../assets/icons/Chevron(ArrowUp).svg';

export const Footer: React.FC = () => {
  const handleClick = useCallback(() => (
    window.scrollTo({ top: 0, left: 0 })
  ), []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="header__logo">
            <img src={logo} alt="Logo" />
          </Link>

          <ul className="footer__info">
            <li className="footer__item">
              <a
                href="https://github.com/ruslan-yarosh/react_phone-catalog"
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                Github
              </a>
            </li>

            <li className="footer__item">
              <a href="/home" className="footer__link">Contacts</a>
            </li>

            <li className="footer__item">
              <a href="/home" className="footer__link">Rights</a>
            </li>
          </ul>

          <button
            type="button"
            className="footer__up"
            onClick={handleClick}
          >
            Back to top

            <span className="footer__up-icon">
              <ArrowUp />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
