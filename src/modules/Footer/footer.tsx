import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './footer.scss';
import navLogo from '../Navbar/NavbarImg/NavLogo.svg';
import footerBack from './footerIMG/FooterBack.svg';

export const FooterPage = () => {
  return (
    <footer
      className={classNames('footer')}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="footer__top">
        <img src={navLogo} alt="Logo" className="footer__logo" />
      </div>
      <menu className={classNames('footer__menu')}>
        <div className="footer__container">
          <NavLink
            to="/github"
            className={({ isActive }) => {
              return classNames('footer__link', {
                'footer__link--active': isActive,
              });
            }}
          >
            Github
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) => {
              // eslint-disable-next-line prettier/prettier, max-len
              return classNames('footer__link', {
                'footer__link--active': isActive,
              });
            }}
          >
            Contacts
          </NavLink>
          <NavLink
            to="/rights"
            className={({ isActive }) => {
              // eslint-disable-next-line prettier/prettier, max-len
              return classNames('footer__link', {
                'footer__link--active': isActive,
              });
            }}
          >
            rights
          </NavLink>
        </div>
        <a href="#top" className="footer__back">
          Back to top
          <div className="footer__button">
            <img src={footerBack} alt="" className="footer__backImg"></img>
          </div>
        </a>
      </menu>
    </footer>
  );
};
