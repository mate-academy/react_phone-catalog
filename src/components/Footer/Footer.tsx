import React from 'react';
import './Footer.scss';

const Footer = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__logo">
          <img src="icons/Logo.png" alt="logo" />
        </div>
        <nav className="footer__menu">
          <ul className="footer__menu--wrapper">
            <li className="footer__menu--item">
              <a href="#">GITHUB</a>
            </li>
            <li className="footer__menu--item">
              <a href="#">CONTACTS</a>
            </li>
            <li className="footer__menu--item">
              <a href="#">RIGHTS</a>
            </li>
          </ul>
        </nav>
        <div className="footer__toTop">
          <div className="footer__toTop--title">Back to top</div>
          <button
            className="footer__toTop--button"
            onClick={() => handleScroll()}
          >
            <img
              src="icons/arrow-up-black.png"
              alt="arrowUp"
              className="footer__toTop--logo"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
