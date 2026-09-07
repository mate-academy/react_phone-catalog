import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-separator"></div>
        <div className="footer__content">
          <div className="footer__logo">
            <Link to="/">
              <img src="./img/main-logo.png" alt="logo" className="footer__logo__link" />
            </Link>
          </div>
          <div className="footer__links">
            <Link to="https://github.com/OleksandrY0" className="footer__link">
              github
            </Link>
            <Link to="/" className="footer__link">
              contacts
            </Link>
            <Link to="/" className="footer__link">
              rights
            </Link>
          </div>
          <div className="footer__go-up" onClick={() => scrollToTop()}>
            <span className="footer__go-up__text">Back to top</span>
            <div className="footer__go-up__img">
              <img src="./img/up.png" alt="up" className="footer__go-up__img__link" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
