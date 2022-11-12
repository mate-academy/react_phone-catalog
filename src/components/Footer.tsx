/* eslint-disable max-len */
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="footer__outer">
      <footer className="footer" id="footer">
        <div className="container grid footer__wrapper">
          <Link to="../" className="footer__logo grid__item grid__item--1-2">
            <img src="img/svg/logo.svg" alt="Logo" />
          </Link>

          <nav className="footer__nav grid__item grid__item--9-16">
            <a href="https://github.com/Ksenia-Didukh/react_phone-catalog" className="footer__link">
              github
            </a>
            <a href="https://www.linkedin.com/in/ksenia-didukh-39a450250/" className="footer__link">CONTACTS</a>
            <Link to="rights" className="footer__link">
              rights
            </Link>
          </nav>

          <button
            type="button"
            className="footer__button grid__item--24-24"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
          >
            <img src="img/svg/arrow-up.svg" alt="Arrow up" />
          </button>
        </div>
      </footer>
    </div>
  );
};
