import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid footer__grid">
          <div className="footer__logo">
            <Link to="/">
              <img src="img/Logo.png" alt="Logo" className="footer__logo-img" />
            </Link>
          </div>

          <div className="footer__sections">
            <a
              href="https://github.com/SoraEmpty"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__section"
            >
              GITHUB
            </a>
            <Link to="/" className="footer__section">
              CONTACTS
            </Link>
            <Link to="/" className="footer__section">
              RIGHTS
            </Link>
          </div>

          <div className="footer__back">
            <button
              className="footer__slider"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="footer__back--text">Back to top</span>
              <img src="img/SliderButton.png" alt="Slider" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
