import React from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft } from '../shared/MoveButtons';
import { getLogo } from '../../services/getLogo';

export const Footer = React.memo(() => {
  return (
    <div className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo-link">
          <img src={getLogo().logo} alt="logo" className="footer__logo" />
        </Link>

        <div className="footer__nav">
          <Link
            to="https://github.com/IShamkii/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__nav-item navigation-title"
          >
            Github
          </Link>
          <Link to="/" className="footer__nav-item navigation-title">
            Contacts
          </Link>
          <Link to="/" className="footer__nav-item navigation-title">
            Rights
          </Link>
        </div>

        <div className="footer__back-to-top">
          <p className="footer__back-to-top-title">Back to top</p>
          <div className="footer__back-to-top-button">
            <MoveLeft move={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
});
