import { Link } from 'react-router-dom';
import logo from '../../images/Logo.png';
import './Footer.scss';

export const Footer = () => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-link">
          <Link className="footer__link" to="home">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="footer__links">
          <a
            className="footer__link"
            href="https://github.com/mate-academy"
            target="blank"
          >
            Github
          </a>
          <a
            className="footer__link"
            href="https://github.com/mate-academy"
            target="blank"
          >
            Contacts
          </a>
          <a
            className="footer__link"
            href="https://github.com/mate-academy"
            target="blank"
          >
            Rights
          </a>
        </div>
        <div className="footer__back-to-top">
          <a
            className="footer__link_back-to-top"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              scrollToTop();
            }}
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};
