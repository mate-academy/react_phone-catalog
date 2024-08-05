import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/">
            <img
              src="./img/icons/logo.svg"
              alt="logo"
              className="footer__logo"
            />
          </Link>
          <nav className="footer__navigation">
            <a className="footer__link" href="https://github.com/">
              GITHUB
            </a>
            <a className="footer__link" href="#">
              CONTACTS
            </a>
            <a className="footer__link" href="#">
              RIGHTS
            </a>
          </nav>
          <nav>
            <button
              className="footer__back"
              onClick={() => window.scrollTo({ top: 0 })}
            >
              Back to top
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
};
