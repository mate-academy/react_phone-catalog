import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <NavLink to="/" className="footer__logo">
        <img
          src={
            theme === 'dark'
              ? '/img/icons/logo.svg'
              : '/img/icons-light/logo-light.svg'
          }
          alt="Logo"
        />
      </NavLink>

      <nav className="footer__links">
        <a
          href="https://github.com/"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>

        <a href="#" className="footer__link">
          Contacts
        </a>

        <a href="#" className="footer__link">
          Rights
        </a>
      </nav>

      <button
        type="button"
        className="footer__button"
        onClick={handleBackToTop}
      >
        <span>Back to top</span>

        <img
          className="footer__button-icon"
          src={
            theme === 'dark'
              ? '/img/icons/arrow-up.svg'
              : '/img/icons-light/arrow-up-light.svg'
          }
          alt="Arrow up"
        />
      </button>
    </footer>
  );
};
