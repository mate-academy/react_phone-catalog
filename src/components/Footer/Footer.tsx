import { Link } from 'react-router-dom';
import arrowUp from '../../images/Icons/arrow_up--dark.svg';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <Link
            to="/"
          >
            <img
              src="/imgFigma/LOGO.svg"
              alt="logo"
            />
          </Link>
        </div>

        <div className="footer__nav">
          <a
            className="footer__nav-link link"
            target="_blank"
            href="https://github.com/Maks-Tsarenko"
            rel="noreferrer"
          >
            github
          </a>

          <a
            className="footer__nav-link link"
            target="_blank"
            href="https://github.com/Maks-Tsarenko"
            rel="noreferrer"
          >
            contacts
          </a>

          <a
            className="footer__nav-link link"
            target="_blank"
            href="https://github.com/Maks-Tsarenko"
            rel="noreferrer"
          >
            rights
          </a>
        </div>

        <button
          className="footer__button"
          type="button"
          onClick={handleBackToTop}
        >
          Back to top
          <img src={arrowUp} alt="arrow up" className="footer__button-img" />
        </button>
      </div>
    </footer>
  );
};
