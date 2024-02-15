import { NavLink } from 'react-router-dom';
import { MyLogo } from '../UI/MyLogo';
import './Footer.scss';

export const Footer = () => {
  function goToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <MyLogo />

          <nav className="footer__nav">
            <NavLink
              to="https://github.com/"
              target="_blank"
              className="footer__link"
            >
              Github
            </NavLink>

            <NavLink
              to="/contacts"
              className="footer__link"
            >
              Contacts
            </NavLink>

            <NavLink
              to="/rights"
              className="footer__link"
            >
              Rights
            </NavLink>
          </nav>

          <div className="footer__right">
            Back to top
            <button
              type="button"
              className="footer__toplink"
              aria-label="to top"
              onClick={goToTop}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
