import { NavLink } from 'react-router-dom';
import logo from '../img/logo.svg';
import logoLight from '../img/logo-light.svg';
import arrowUp from '../img/arrowUp.svg';
import './Footer.scss';
import { useContext } from 'react';
import { ThemeContext } from '../Themes/Themes';

export const Footer = () => {
  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { theme } = useContext(ThemeContext);

  const isBasicDark = theme === 'dark';

  return (
    <footer className="footer">
      <nav role="navigation" aria-label="footer navigation">
        <div className="footer__container">
          <NavLink className="footer__logo" to="/">
            <img src={isBasicDark ? logo : logoLight} alt="Logo" />
          </NavLink>
          <ul className="footer-brand">
            <NavLink
              className="footer-item"
              to="https://github.com/tina-moskvinova"
              target="_blank"
            >
              GitHub
            </NavLink>

            <NavLink
              className="footer-item"
              to="https://www.linkedin.com/in/"
              /*Create an account and add a link */
              target="_blank"
            >
              Contacts
            </NavLink>
          </ul>
          <div className="footer__button">
            <h3 className="footer__buttonsName">Back to top</h3>
            <button className="fotter_btn" onClick={scrollTop}>
              <img src={arrowUp} alt="Scroll to top" />
              {/* theme changes are not take into calculation*/}
            </button>
          </div>
        </div>
      </nav>
    </footer>
  );
};
