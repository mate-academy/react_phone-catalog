import { FC } from 'react';

import './Footer.scss';

export const Footer: FC = () => {
  return (
    <div className="footer">
      <img src="img/LOGO.svg" alt="Logo" />

      <div className="footer__container">
        <a
          href="https://github.com/deandre25/react_phone-catalog"
          className="footer-item"
        >
          GitHub
        </a>

        <a
          href="/"
          className="footer-item"
        >
          Contacts
        </a>

        <a
          href="/"
          className="footer-item"
        >
          Rights
        </a>
      </div>

      <div className="footer-back">
        <p className="footer-back__title">Back to top</p>
      </div>
    </div>
  );
};
