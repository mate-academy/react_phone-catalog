import { Logo } from '../Logo/Logo';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <Logo />
        <ul className="footer__list">
          <li className="footer__item">
            <h1 className="footer__title">Github</h1>
          </li>
          <li className="footer__item">
            <h1 className="footer__title">Contacts</h1>
          </li>
          <li className="footer__item">
            <h1 className="footer__title">Rights</h1>
          </li>
        </ul>
        <div className="footer-container-back">
          <h1 className="footer__title-back">
            Back to top
          </h1>
          <NavLink
            to=""
            className="footer__link-back"
            onClick={scrollToTop}
          />
        </div>
      </div>
    </footer>
  );
};
