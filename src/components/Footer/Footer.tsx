import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo">
          <img
            src={`img/Icons/Logo.svg`}
            alt="logo"
            className="footer__logo-icon"
          />
        </Link>
        <ul className="footer__list">
          <li>
            <a
              className="footer__link"
              href="https://github.com/TarasPidkuimukha/react_phone-catalog"
            >
              GITHUB
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://github.com/TarasPidkuimukha"
            >
              CONTACTS
            </a>
          </li>
          <li>
            <a className="footer__link" href="">
              RIGHTS
            </a>
          </li>
        </ul>

        <button
          className="footer__back-to-top"
          type="button"
          onClick={() => scrollToTop()}
        >
          <span className="footer__back-text">Back to top</span>
          <span className="footer__arrow-btn chevron-up"> &lsaquo;</span>
        </button>
      </div>
    </footer>
  );
};
