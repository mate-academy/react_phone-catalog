import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Footer.scss';

const Footer = () => {
  const footerItems = ['GITHUB', 'CONTACTS', 'RIGHTS'];

  const backToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="footer">

      <nav className="footer__nav">
        <Logo />
        <ul className="footer__list">
          {footerItems.map(item => (
            <li>
              <NavLink
                to={`${item}`}
                key={item}
                exact
                className="footer__item"
                activeClassName="footer__item__active"
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="footer__container">
          <p className="footer__backToTop">
            Back to top
          </p>
          <button
            type="button"
            aria-label="BackToTop"
            className="footer__button"
            onClick={backToTop}
          >
            <img src="../img/icons/backToTop.svg" alt="Back to top" />
          </button>
        </div>


      </nav>

    </footer>
  );
};

export default Footer;
