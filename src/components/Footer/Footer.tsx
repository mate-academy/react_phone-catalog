import { Link } from 'react-router-dom';
import { FooterNavigation } from '../FooterNavigation/FooterNavigation';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main-flex-box">
          <div className="footer__main-item footer__logo-box">
            <Link to="/" className="footer__logo-link">
              <img
                src={`./img/logo.svg`}
                alt="logo"
                className="footer__logo-image"
              />
            </Link>
          </div>
          <div className="footer__main-item">
            <FooterNavigation />
          </div>
          <div className="footer__main-item">
            <button className="footer__scroll-top-btn" onClick={scrollToTop}>
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
