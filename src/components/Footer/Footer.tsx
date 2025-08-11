import { NavLink } from 'react-router-dom';
import logo from '../../img/logo.svg';
import logoLight from '../../img/logoLight.svg';
import up from '../../img/arrowUp.svg';
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
              to="https://www.linkedin.com/in/valentyna-moskvinova-a18751379/"
              target="_blank"
            >
              Contacts
            </NavLink>
          </ul>
          <div className="footer__button">
            <h3 className="footer__buttonsName">Back to top</h3>
            <button className="footer__btn" onClick={scrollTop}>
              <img className="btn-img" src={up} alt="up" />
            </button>
          </div>
        </div>
      </nav>
    </footer>
  );
};
