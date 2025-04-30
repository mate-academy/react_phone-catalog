import { NavLink } from 'react-router-dom';
import logo from '../../../image/logo.svg';
import BlackLogo from '../../../image/BlackLogo.svg';
import './Footer.scss';
import { useContext } from 'react';
import { ThemeContext } from '../ColorThemes/ColorThemes';

export const Footer = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  return (
    <footer className="footer">
      <nav role="navigation" aria-label="footer navigation">
        <div className="footer__container">
          <NavLink className="footer__logo" to="/">
            <img src={isDarkMode ? logo : BlackLogo} alt="Logo" />
          </NavLink>
          <ul className="footer-brand">
            <NavLink
              className="footer-item"
              to="https://github.com/taniavozniuk"
              target="_blank"
            >
              Github
            </NavLink>

            <NavLink
              className="footer-item"
              // eslint-disable-next-line max-len
              to="https://www.linkedin.com/in/%D1%82%D0%B0%D0%BD%D1%8F-%D0%B2%D0%BE%D0%B7%D0%BD%D1%8E%D0%BA-3192432a3/"
              target="_blank"
            >
              Contacts
            </NavLink>

            <NavLink className="footer-item" to="/" target="_blank">
              rights
            </NavLink>
          </ul>
          <div className="footer__button">
            <h3 className="footer__buttonsTitle">Back to top</h3>
            <button className="footer_but" onClick={scrollToTop}>
              &#8743;
            </button>
          </div>
        </div>
      </nav>
    </footer>
  );
};
