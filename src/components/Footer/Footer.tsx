/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import './Footer.scss';
import logoImg from '../../images/LOGO.svg';
import arrow from '../../images/Arrow.svg';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <img src={logoImg} className="footer__logo" alt="logo_image" />

          <nav className="nav__list">
            <Link to="/" className="nav__list-item">Github</Link>
            <Link to="/" className="nav__list-item">Contacts</Link>
            <Link to="/" className="nav__list-item">rights</Link>
          </nav>

          <div className="nav__top">
            <div className="nav__top-text">
              Back to top
            </div>
            <button
              className="nav__top-button"
              type="button"
              onClick={scrollToTop}
            >
              <img src={arrow} alt="arrow" className="nav__top-img" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
