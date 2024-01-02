import { Link } from 'react-router-dom';

import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

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

      <button
        type="button"
        onClick={scrollToTop}
        className="footer__scroll"
      >
        <div className="footer__link">Back to top</div>
        <div className="arrow-top" />
      </button>
    </div>
  );
};
