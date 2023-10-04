import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/#" className="logo">
          <img
            src="icons/logo.svg"
            alt="logo"
          />
        </Link>
        <nav className="footer__nav">
          <Link to="https://github.com/ifuride" className="footer__navlink">
            Github
          </Link>

          <Link to="https://github.com/ifuride" className="footer__navlink">
            Contacts
          </Link>

          <Link to="https://github.com/ifuride" className="footer__navlink">
            Rights
          </Link>
        </nav>
        <button
          type="button"
          className="footer__button square-button"
          onClick={handleBackToTop}
        >
          <img
            src="icons/topArrow.svg"
            className="footer__top"
            alt="back to top"
          />
        </button>
      </div>
    </footer>
  );
};
