import { Link } from 'react-router-dom';
import { Logo } from '../UI/Logo';
import './footer.scss';
import { scrollToTop } from '../../services/scrollToTop';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Logo />

        <div className="footer__links">
          <Link
            to="https://github.com/Oleksii-Mishchenko/react_phone-catalog"
            className="footer__link"
            target="_blank"
          >
            GITHUB
          </Link>

          <Link
            to="https://github.com/Oleksii-Mishchenko"
            className="footer__link"
            target="_blank"
          >
            CONTACTS
          </Link>

          <Link
            to="https://github.com/Oleksii-Mishchenko?tab=repositories"
            className="footer__link"
            target="_blank"
          >
            RIGHTS
          </Link>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="footer__back-to-top"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};
