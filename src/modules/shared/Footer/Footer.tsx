import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo-link">
          <img
            src="/img/logo/logo-mobile.svg"
            alt="logo"
            className="footer__logo"
          />
        </Link>

        <div className="footer__nav">
          <Link
            to="https://github.com/IShamkii/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__nav-item quaternary-title"
          >
            Github
          </Link>
          <Link to="/" className="footer__nav-item quaternary-title">
            Contacts
          </Link>
          <Link to="/" className="footer__nav-item quaternary-title">
            Rights
          </Link>
        </div>

        <div className="footer__back-to-top">
          <p className="footer__back-to-top-title">Back to top</p>
          <a href="#/" className="footer__back-to-top-link">
            <img src="/img/icons/back-to-top.svg" alt="back to top" />
          </a>
        </div>
      </div>
    </div>
  );
};
