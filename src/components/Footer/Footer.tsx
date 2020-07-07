import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__box home__box">
        <div className="footer__logo">
          {/* <img src="../img/LOGO.svg" alt="logo" /> */}
        </div>
        <nav className="footer__nav">
          <ul className="footer__nav__list">
            <li className="footer__nav__item">
              <a href="https://github.com/" className="nav__link">github</a>
            </li>
            <li className="footer__nav__item">
              <a href="https://github.com/" className="nav__link">contacts</a>
            </li>
            <li className="footer__nav__item">
              <a href="https://github.com/" className="nav__link">rights</a>
            </li>
          </ul>
        </nav>
        <div className="footer__back">
          <p className="footer__back--p">back to top</p>
          <button className="footer__back--button" type="button">
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
