import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import './Footer.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav
      data-cy="nav"
      className="footer is-fixed-bottom has-shadow"
      role="navigation"
      aria-label="sub navigation"
    >
      <div className="footer__container">
        <div className="footer-content">
          <Logo />
          <div className="footer__center">
            <NavLink
              to="/"
              target="_blank"
              className="footer__center-item"
            >
              Gihub
            </NavLink>
            <NavLink
              to="/"
              target="_blank"
              className="footer__center-item"
            >
              Contacts
            </NavLink>
            <NavLink
              to="/"
              target="_blank"
              className="footer__center-item"
            >
              Rights
            </NavLink>
          </div>
          <div className="footer__right">
            <span className="footer__right-text">Back to top</span>
            <button
              className="footer__right-button"
              aria-label="label"
              type="button"
              onClick={handleScrollToTop}
            >
              <div className="icon-top" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
