import { Link } from 'react-router-dom';

import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <Link
        className="page__logo"
        to="/"
        title="Back to HomePage"
      />

      <div className="footer__information">
        <Link
          className="footer__link"
          to="https://github.com/MaksymKos/react_phone-catalog"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </Link>
        <p
          className="footer__link"

        >
          Contacts
        </p>
        <p
          className="footer__link"
        >
          Rights
        </p>
      </div>

      <Link
        className="footer__scroll"
        to="/"
      >
        <div className="footer__link">Back to top</div>
        <div className="arrow-top" />
      </Link>
    </div>
  );
};
