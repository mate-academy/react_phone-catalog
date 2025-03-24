import { NavLink } from 'react-router-dom';
import logo from '../../../image/logo.svg';
import BlackLogo from '../../../image/BlackLogo.svg';
import './Footer.scss';
import { useContext } from 'react';
import { ThemeContext } from '../ColorThemes/ColorThemes';
// import { useProductHooks } from '../ProductPage/usePhonesHooks';

export const Footer = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  // const { loading } = useProductHooks();

  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  return (
    <footer className="footer">
      <nav
        // className="footer is-fixed-top has-shadow"
        role="navigation"
        aria-label="footer navigation"
      >
        {/* {!loading && ( */}
        <div className="footer__container">
          <div className="footer__logo">
            <img src={isDarkMode ? logo : BlackLogo} alt="Logo" />
          </div>
          <ul className="footer-brand">
            <NavLink className="footer-item" to="/">
              Github
            </NavLink>

            <NavLink className="footer-item" to="/">
              Contacts
            </NavLink>

            <NavLink className="footer-item" to="/">
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
        {/* )} */}
      </nav>
    </footer>
  );
};
