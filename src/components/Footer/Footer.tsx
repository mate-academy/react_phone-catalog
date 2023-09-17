import { FC } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../../assets/icons/logo-icon';
import { ArrowUp } from '../../assets/icons/ArrowUp';
import './Footer.scss';

export const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="logo-container">
        <LogoIcon />
      </div>

      <div className="footer-links">
        <Link
          to="https://github.com/SamirMamedov1010/react_phone-catalog"
          className="footer-link github"
        >
          GITHUB
        </Link>

        <Link
          to="#contacts"
          className="footer-link contacts"
        >
          CONTACTS
        </Link>

        <Link
          to="#rights"
          className="footer-link rights"
        >
          RIGHTS
        </Link>
      </div>

      <button
        className="footer-button"
        type="button"
        onClick={scrollToTop}
      >
        <span className="button-text">
          Back to top
        </span>

        <div className="footer-button-container">
          <ArrowUp />
        </div>
      </button>
    </footer>
  );
};
