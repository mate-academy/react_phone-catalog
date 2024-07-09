import React from 'react';
import { arrowUpImg, logoImg } from '../../utils/indes';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__block">
        <Link to="/" className="footer__logo">
          <img src={logoImg} alt="Logo" className="footer__logo--img" />
        </Link>

        <nav className="footer__nav">
          <Link
            to="https://github.com/SerhiiVoitiuk"
            className="footer__nav--link"
          >
            Github
          </Link>
          <Link
            to="https://github.com/SerhiiVoitiuk"
            className="footer__nav--link"
          >
            Contacts
          </Link>
          <Link
            to="https://github.com/SerhiiVoitiuk"
            className="footer__nav--link"
          >
            Rights
          </Link>
        </nav>

        <div className="footer__back">
          <p className="footer__back--title">Back to top</p>
          <button
            className="footer__button"
            type="button"
            onClick={scrollToTop}
          >
            <img src={arrowUpImg} alt="ArrowUp" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
