import React from 'react';
import './Footer.scss';

const Footer:React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content container">
        <button
          type="button"
          className="footer__btn"
          onClick={scrollToTop}
        >
          <img
            className="footer__logo"
            src="../../img/LOGO.svg"
            alt="logo"
          />
        </button>
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a
                className="footer__nav-link upperCase"
                href="https://github.com/Pavlo-Khashchevskyi?tab=repositories"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className="footer__btn"
          onClick={scrollToTop}
        >
          <span className="footer__btn-text">Back to top</span>
          <div className="footer__btn-img" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
