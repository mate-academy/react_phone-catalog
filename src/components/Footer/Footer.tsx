import { NavLink } from 'react-router-dom';
import { LogoIcon } from '../../assets/img/icons/LogoIcon';
import { ArrowUp } from '../../assets/img/icons/ArrowUp';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <NavLink to="/">
        <LogoIcon />
      </NavLink>

      <div className="footer__network-nav">
        <a
          href="https://github.com/dimkamg21"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__network-link"
        >
          Github
        </a>

        <a
          href="https://github.com/dimkamg21"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__network-link"
        >
          Contacts
        </a>

        <a
          href="https://github.com/dimkamg21"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__network-link"
        >
          Rights
        </a>
      </div>
      <div className="footer__arrow-back-container">
        <p>Back to top</p>
        <button
          className="footer__arrow-back"
          type="button"
          onClick={() => window.scroll(0, 0)}
        >
          <ArrowUp />
        </button>
      </div>
    </footer>
  );
};
