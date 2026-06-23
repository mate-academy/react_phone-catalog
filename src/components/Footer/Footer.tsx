/* eslint-disable max-len */
import './Footer.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="footer__logo">
            <img
              src="img/icons/logo.svg"
              alt="Nice Gadgets Logo"
              className="footer__logo-img"
            />
          </Link>

          <nav className="footer__nav">
            <ul className="footer__list">
              <li className="footer__item">
                <a
                  href="https://github.com/AleksanderChaika"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="https://t.me/A_l_e_k_s_a_n_d_e_r_97"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contacts
                </a>
              </li>
              <li className="footer__item">
                <Link to="/rights" className="footer__link">
                  Rights
                </Link>
              </li>
            </ul>
          </nav>

          <div className="footer__back-to-top">
            <span className="footer__back-text">Back to top</span>
            <button
              type="button"
              className="footer__back-button"
              onClick={scrollToTop}
            >
              <img
                src="img/icons/arrow-up.svg"
                alt="Top"
                className="footer__back-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
