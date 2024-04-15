import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';
import '../../styles/main.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <Link to="/home" className="footer__logo-icon" />
        </div>

        <nav className="footer__nav">
          <NavLink
            to="https://github.com/katya-sn/react_phone-catalog"
            className="footer__nav-link"
          >
            GITHUB
          </NavLink>
          <NavLink to="contacts" className="footer__nav-link">
            CONTACTS
          </NavLink>
          <NavLink to="rights" className="footer__nav-link">
            RIGHTS
          </NavLink>
        </nav>

        <div className="footer__back">
          <div className="footer__back-button">
            <div
              className="footer__back-button-text"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top
            </div>
            <div className="footer__back-button-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
