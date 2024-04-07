import { Link, useLocation } from 'react-router-dom';
import './Footer.scss';
import { RoundButton } from '../RoundButton';

export const Footer = () => {
  const { pathname } = useLocation();
  const isMenuOpened = pathname === '/menu';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isMenuOpened) {
    return null;
  }

  return (
    <div className="footer footer--margin-top">
      <div className="container footer__container">
        <Link to="/" className="footer__logo">
          <img src="./img/logo.svg" alt="Logo" className="footer__logo-image" />
        </Link>
        <div className="footer__links">
          <a href="#" className="footer__link-item">
            Github
          </a>
          <a href="#" className="footer__link-item">
            Contacts
          </a>
          <a href="#" className="footer__link-item">
            rights
          </a>
        </div>
        <div className="footer__button">
          Back to top
          <RoundButton buttonType="up" onClick={scrollToTop} />
        </div>
      </div>
    </div>
  );
};
