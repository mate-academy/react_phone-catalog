/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { backToTop } from '../../utils/constants';

import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__content">
        <Logo />

        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <Link
                to="/github"
                target="_blank"
                className="footer__nav-link"
                onClick={backToTop}
              >
                Github
              </Link>
            </li>

            <li className="footer__nav-item">
              <Link
                to="/contacts"
                className="footer__nav-link"
                onClick={backToTop}
              >
                Contacts
              </Link>
            </li>

            <li className="footer__nav-item">
              <Link
                to="/rights"
                className="footer__nav-link"
                onClick={backToTop}
              >
                Rights
              </Link>
            </li>
          </ul>
        </nav>

        <div className="footer__back">
          <p className="footer__back-text">
            Back to top
          </p>

          <button
            type="button"
            className="button button__arrow button__arrow--top"
            onClick={backToTop}
          />

        </div>
      </div>
    </div>
  </footer>
);
