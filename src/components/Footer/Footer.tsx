import { Link } from 'react-router-dom';
import './footer.scss';

export const Footer = () => {
  return (
    <div className="footerBlock">
      <div className="footer-container">
        <div className="logoContainer">
          <Link to="/" className="footer-logo-link">
            <img
              src="img/logo/logo.svg"
              alt="Company logo"
              className="logo footer-logo"
            />
          </Link>
        </div>

        <div className="footerLinks">
          <a
            href="https://github.com/andriy-chornyy"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>

          <a
            href="https://github.com/andriy-chornyy"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </a>

          <a
            href="https://github.com/andriy-chornyy"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rights
          </a>
        </div>

        <div className="backToTop-container">
          <div className="button-box">
            <div
              className="button-name"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top
            </div>
          </div>

          <div
            className="button has-shadow-cursor"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="img/icons/ArrowTop.svg"
              alt="Arrow Top"
              className="arrowTop"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
