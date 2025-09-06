import { useContext } from 'react';
import logo from '../../../public/img/logo.svg';
import logoLight from '../../../public/img/logoLight.svg';
import { ThemeContext } from '../Themes/Themes';
import { NavLink } from 'react-router-dom';
import arrowUp from '../../../public/img/arrowUp.svg';

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
        <div className="footer_container">
          <NavLink className="footer_logo" to="/">
            <img src={isBasicDark ? logo : logoLight} alt="logo" />
          </NavLink>
          <ul>
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
          </ul>
          <div className="footer_button">
            <h3 className="footer_buttonsName">Back to top</h3>
            <button className="footer_btn" onClick={scrollTop}>
              <img src={arrowUp} alt="Scroll to top" />
            </button>
          </div>
        </div>
      </nav>
    </footer>
  );
};
