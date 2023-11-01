import { ReactSVG } from 'react-svg';
import { Logo } from '../Logo';
import './Footer.scss';
import { handleScrollToTop } from './utils';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Logo />

      <ul className="footer__links">
        <li className="footer__item">
          <a
            href="https://github.com/NataliiaHen/react_phone-catalog"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </li>

        <li className="footer__item">
          <a
            href="/"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Contacts
          </a>
        </li>

        <li className="footer__item">
          <a
            href="/"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Rights
          </a>
        </li>
      </ul>

      <div className="footer__back-to-top">
        <label
          htmlFor="back-to-top"
          className="footer__back-label"
        >
          Back to top
        </label>
        <button
          type="button"
          className="footer__back-button"
          aria-label="back-to-top"
          id="back-to-top"
          onClick={handleScrollToTop}
        >
          <ReactSVG
            src="img/icons/Chevron (Arrow Up).svg"
          />
        </button>
      </div>
    </footer>
  );
};
