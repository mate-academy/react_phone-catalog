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
          <Link to="/#" className="footer__link" target="_blank">
            GITHUB
          </Link>

          <Link to="/#" className="footer__link">CONTACTS</Link>

          <Link to="/#" className="footer__link">RIGHTS</Link>
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
