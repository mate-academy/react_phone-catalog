import React from 'react';
import './Footer.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__content">
      <img src="./img/logo.svg" alt="logo" />
      <div className="contacts">
        <a className="contacts__link" href="github.com">Github</a>
        <a className="contacts__link" href="/">Contacts</a>
        <a className="contacts__link" href="/">Rights</a>
      </div>
      <div>
        <span className="button-text">Back to top</span>
        <button
          type="button"
          className="to-top-button"
          onClick={() => window.scroll(0, 0)}
        >
          {'>'}
        </button>
      </div>
    </div>
  </footer>
);
