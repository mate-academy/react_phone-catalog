import { Link, useLocation } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const location = useLocation();

  const backToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      {location.pathname !== '/menu' && (
        <div className="container">
          <div className="footer__content">
            <Link to="/" className="footer__logo logo">
              <img src="Logo.svg" alt="logo" className="logo__image-footer" />
            </Link>

            <nav className="footer__nav nav">
              <Link
                to="https://github.com/natalia-maryshko?tab=repositories"
                className="footer__nav-link nav__link"
              >
                Github
              </Link>
              <Link to="/contacts" className="footer__nav-link nav__link">
                Contacts
              </Link>
              <Link to="/rights" className="footer__nav-link nav__link">
                Rights
              </Link>
            </nav>

            <div className="footer__back-to-top">
              Back to top
              <Link
                to={{ pathname: location.pathname }}
                className="footer__icon icon icon--up"
                onClick={backToUp}
              />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
