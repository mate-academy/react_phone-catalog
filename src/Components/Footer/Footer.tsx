import './Footer.scss';
import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import ArrowImage from './Footer-images/Arrow.svg';
import LogoImage from './Footer-images/LOGO.svg';

export const Footer: FC = () => {
  const location = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__FirstChild">
        <div className="footer__FirstChild-logo">
          <Link to="/">
            <img className="logoImage" src={LogoImage} alt="Logo" />
          </Link>
        </div>
      </div>

      <div className="footer__TwoChild">
        <nav className="footer__FirstChild-nav">
          <ul className="footer__FirstChild-nav-list">
            <li className="footer__FirstChild-nav-item">
              <Link
                to="https://github.com/nazar-medushevskyi?tab=repositories"
                className="footer__FirstChild-nav-link"
              >
                Github
              </Link>
            </li>
            <li className="footer__FirstChild-nav-item">
              <Link
                to="/contacts"
                className={`footer__FirstChild-nav-link ${location.pathname === '/contacts' ? 'is-activee' : ''}`}
              >
                Contacts
              </Link>
            </li>
            <li className="footer__FirstChild-nav-item">
              <Link
                to="/rights"
                className={`footer__FirstChild-nav-link ${location.pathname === '/rights' ? 'is-activee' : ''}`}
              >
                rights
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="footer__ThridChild">
        <p className="footer-p">Back to top</p>
        <div className="footer__LastChild-arrow">

          <button
            type="button"
            className="arrow-button"
            onClick={handleScrollToTop}
          >
            <img
              className="arrow-svg"
              src={ArrowImage}
              alt="basket"
            />
          </button>

        </div>
      </div>

    </footer>
  );
};
