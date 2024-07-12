import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import Logo from '../../images/Logo.svg';
import LogoDark from '../../images/LogoDark.svg';
import ArrowUp from '../../images/arrowUp.svg';
import ArrowUpDark from '../../images/arrowUpDark.svg';

export const Footer = () => {
  const { light } = useContext(ThemeContext);

  const getClassName = themeClass(light);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={getClassName('footer')}>
      <div className={getClassName('footer__block')}>
        <NavLink to={'/'} className={getClassName('logo')}>
          {light ? (
            <img src={Logo} className="logo-light" alt="Logo" />
          ) : (
            <img src={LogoDark} className="logo-dark" alt="Logo" />
          )}
        </NavLink>

        <div className="footer__block--box">
          <a
            href="https://github.com/Reaffith/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
            className={getClassName('footer__block--box--link')}
          >
            GITHUB
          </a>

          <a
            href="mailto:tarasnechyporuck@gmail.com"
            className={getClassName('footer__block--box--link')}
          >
            CONTACTS
          </a>

          <Link to="/" className={getClassName('footer__block--box--link')}>
            Rights
          </Link>
        </div>
        <div className="footer__block--moveup">
          <p className={getClassName('footer__block--moveup-text')}>
            Back to the top
          </p>

          <button
            onClick={scrollToTop}
            className={getClassName('footer__block--moveup-button')}
          >
            <img src={light ? ArrowUp : ArrowUpDark} alt="move to the top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
