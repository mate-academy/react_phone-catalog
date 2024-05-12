import React from 'react';
import './Footer.scss';
import logo from './../../img/Icons/Logo.png';
import arrowUp from './../../img/Icons/arrow-up-black.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__logo">
          <img src={logo} alt="logo" />
        </div>
        <nav className="footer__menu">
          <ul className="footer__menu--wrapper">
            <li className="footer__menu--item">
              <a href="">GITHUB</a>
            </li>
            <li className="footer__menu--item">
              <a href="">CONTACTS</a>
            </li>
            <li className="footer__menu--item">
              <a href="">RIGHTS</a>
            </li>
          </ul>
        </nav>
        <div className="footer__toTop">
          <div className="footer__toTop--title">Back to top</div>
          <div className="footer__toTop--button">
            <img src={arrowUp} alt="arrowUp" className="footer__toTop--logo" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
