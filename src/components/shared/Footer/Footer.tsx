import './Footer.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <>
      <div className="footer">
        <div className="footer__logo"></div>
        <div className="footer__bullets">
          <Link className="footer__bullet" to={'https://github.com/friranger1'}>
            Github
          </Link>
          <Link className="footer__bullet" to={'https://t.me/friranger'}>
            Contacts
          </Link>
          <Link className="footer__bullet" to={'https://t.me/friranger'}>
            rights
          </Link>
        </div>
        <div className="footer__button-container">
          <p className="footer__button-text">Back to top</p>
          <a href="#" className="footer__button">
            <div className="footer__icon"></div>
          </a>
        </div>
      </div>
    </>
  );
};
