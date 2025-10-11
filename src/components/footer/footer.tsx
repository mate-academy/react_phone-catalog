import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import './footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <a href="" className="footer__link">
          <img
            src="../../../public/img/logo/Logo.svg"
            alt=""
            className="footer__logo__link--image"
          />
        </a>
      </div>

      <div className="footer__items">
        <a href="" className="footer__items__link">
          Github
        </a>
        <a href="" className="footer__items__link">
          Contacts
        </a>
        <a href="" className="footer__items__link">
          rights
        </a>
      </div>

      <div className="footer__backtotop">
        <p className="footer__backtotop__name">Back to top</p>
        <button
          className="footer__backtotop__button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
        </button>
      </div>
    </footer>
  );
};
