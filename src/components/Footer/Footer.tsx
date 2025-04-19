import React from 'react';
import { Link } from 'react-router-dom';
import handIcon from '../../assets/img/hand.svg';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <Link to="/" className="footer__logo-link">
            <div className="footer__logo-container">
              <div className="footer__logo-text">
                <div className="footer__logo-nice-container">
                  <span className="footer__logo-nice">NICE</span>
                  <img src={handIcon} alt="OK" className="footer__logo-hand" />
                </div>
                <span className="footer__logo-gadgets">GADGETS</span>
              </div>
            </div>
          </Link>
        </div>

        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a
                href="https://github.com/your-username/react_phone-catalog"
                className="footer__nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
            </li>
            <li className="footer__nav-item">
              <Link to="/contacts" className="footer__nav-link">
                CONTACTS
              </Link>
            </li>
            <li className="footer__nav-item">
              <Link to="/rights" className="footer__nav-link">
                RIGHTS
              </Link>
            </li>
          </ul>
        </nav>

        <div className="footer__back-to-top">
          <a href="#top" className="footer__back-link">
            <span className="footer__back-text">Back to top</span>
            <span className="footer__back-icon">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
