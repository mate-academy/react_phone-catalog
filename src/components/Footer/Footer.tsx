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
          <Link
            to="https://github.com/artemvlasiuk/react_phone-catalog"
            className="footer__link-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
          <Link to="#" className="footer__link-item">
            Contacts
          </Link>
          <Link to="#" className="footer__link-item">
            rights
          </Link>
        </div>
        <div className="footer__button">
          Back to top
          <RoundButton buttonType="up" onClick={scrollToTop} />
        </div>
      </div>
    </div>
  );
};
