import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { Logo } from '../Logo/Logo';

export const Footer = () => {
  function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <Logo className="footer__logo" />

          <nav className="navbar">
            <NavLink
              to="https://github.com/JaneShavrukova/react_phone-catalog/"
              className="navbar__link"
            >
              GitHub
            </NavLink>
            <NavLink to="contacts" className="navbar__link">
              Contacts
            </NavLink>
            <NavLink to="rights" className="navbar__link">
              Rights
            </NavLink>
          </nav>

          <div className="footer__back-to-top">
            <span className="footer__back-to-top-text">Back to top</span>
            <button
              type="button"
              className="footer__back-to-top-button"
              onClick={goToTop}
            >
              <img src="/img/icons/arrow-top.svg" alt="arrow-top" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
