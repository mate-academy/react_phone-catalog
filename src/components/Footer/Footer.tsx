import { FC } from 'react';
import './Footer.scss';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <a href="/#" className="logo">
          <img
            src="icons/logo.svg"
            alt="logo"
          />
        </a>
        <nav className="footer__nav">
          <a href="/#" className="footer__navlink">
            Github
          </a>

          <a href="/#" className="footer__navlink">
            Contacts
          </a>

          <a href="/#" className="footer__navlink">
            Rights
          </a>
        </nav>
        <button type="button" className="footer__button square-button">
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
