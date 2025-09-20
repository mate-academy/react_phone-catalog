import './Footer.scss';
import { useContext } from 'react';
import logo from '../../assets/icons/logo.svg';
import logoLight from '../../assets/icons/logoLight.svg';
import { ThemeContext } from '../Themes/Themes';
import { NavLink } from 'react-router-dom';
import arrowUp from '../../assets/icons/arrowUpL.svg';

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
      <nav role="">
        <div className="footer__container">
          <NavLink className="footer__logo" to="/">
            <img src={isBasicDark ? logo : logoLight} alt="logo" />
          </NavLink>
          <ul className="footer-links">
            <NavLink
              className="footer-item"
              to="https://github.com/kifont"
              target="_blank"
            >
              Github
            </NavLink>

            <NavLink
              className="footer-item"
              to="https://github.com/kifont/react_phone-catalog"
              target="_blank"
            >
              Contacts
            </NavLink>

            <NavLink className="footer-item" to="/" target="_blank">
              Rights
            </NavLink>
          </ul>
          <div className="footer__button">
            <h3 className="footer__buttonsName">Back to top</h3>
            <button className="footer__btn" onClick={scrollTop}>
              <img src={arrowUp} alt="Scroll to top" />
            </button>
          </div>
        </div>
      </nav>
    </footer>
  );
};
