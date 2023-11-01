import { useState } from 'react';
import './Footer.scss';

export const Footer = () => {
  const [hasVerticalScroll, setHasVerticalScroll] = useState(false);

  const logo: string = require('../../icons/logo.svg').default;
  const arrowUp: string = require('../../icons/chevron-arrow-up-hover.svg').default;

  function checkIfPageHasScroll() {
    setHasVerticalScroll(document.body.scrollHeight > window.innerHeight);
  }

  window.addEventListener('scroll', checkIfPageHasScroll);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <a
          href="/"
          className="footer__img"
        >
          <img src={logo} alt="logo" />
        </a>

        <nav className="footer__nav">
          <ul className="footer__nav__list">
            <li className="footer__nav__item">
              <a
                href="/"
                className="footer__nav__link"
              >
                GITHUB
              </a>
            </li>

            <li className="footer__nav__item">
              <a
                href="#phones"
                className="footer__nav__link"
              >
                CONTACTS
              </a>
            </li>

            <li className="footer__nav__item">
              <a
                href="#tablets"
                className="footer__nav__link"
              >
                RIGHTS
              </a>
            </li>
          </ul>
        </nav>

        {hasVerticalScroll && (
          <button
            onClick={handleClick}
            id="myBtn"
            className="footer__up"
          >
            <div className="footer__up--container">
              <div className="footer__up--text"> Back to top</div>
              <img
                src={arrowUp}
                alt="top"
                className="footer__icon"
              />
            </div>
          </button>
        )}
      </div>
    </footer>
  );
};
