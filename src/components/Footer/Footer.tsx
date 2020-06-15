import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from './../../helpers/constants';
import { NavList } from './../NavList';
import { NavIconsList } from './../NavList';
import { Logo, UpArrow } from '../SvgSprite/SvgSprite';

export const Footer = () => {

  const handleClick = () => {
    const scroll = () => {
      setTimeout(() => {
        window.scrollBy(0, -20);
        if (window.scrollY > 0) {
          scroll();
        }
      }, 1);
    }
    scroll();
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <nav className="footer_nav nav">
          <Link to="/" className="footer__logo">
            <Logo />
          </Link>
          <ul className="footer__nav-list  nav__list">
            <NavList list={footerLinks}/>
          </ul>
          <ul className="footer__nav-list--mini  nav__icons-list">
            <NavIconsList list={footerLinks}/>
          </ul>
          <div className="footer__link">
            <Link
              to="#top"
              type="button"
              className="footer__link--up"
              onClick={handleClick}
            >
              <span className="footer__btn-link--up">
                <UpArrow />
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};
