import { Link } from 'react-router-dom';
import './Footer.scss';
import logoFooterIcon from '../../icons/LOGO.png';
import backToTopFooterIcon from
  '../../icons/Slider button - Default (right).png';

export const Footer = () => {
  return (
    <footer className="footer">
      <img src={logoFooterIcon} className="footer__logo" alt="logo" />

      <nav className="footer__nav">
        <Link
          to="https://github.com/VadymTsyndra/react_phone-catalog"
          className="footer__nav-link"
          target="_blank"
          rel="noreferrer"
        >
          GITHUB
        </Link>
        <Link to="/" className="footer__nav-link">CONTACTS</Link>
        <Link to="/" className="footer__nav-link">RIGHTS</Link>
      </nav>

      <div className="footer__right-block">
        <div className="footer__right-block-text">
          Back to top
        </div>

        <button
          type="button"
          className="footer__right-block-button"
        >
          <img
            src={backToTopFooterIcon}
            className="footer__right-block-img"
            alt="button back to top"
          />
        </button>
      </div>
    </footer>
  );
};
