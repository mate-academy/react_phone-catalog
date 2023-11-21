import { Link, NavLink } from 'react-router-dom';
import { scrollToTop } from './utils/scrollTop';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <NavLink
          to="/#"
          onClick={scrollToTop}
        >
          <div className="footer__image" />
        </NavLink>
      </div>

      <div className="footer__content">
        <div className="footer__link_container">
          <Link
            to="/#"
            className="footer__link"
            onClick={scrollToTop}
          >
            GITHUB
          </Link>
          <Link
            to="/#"
            className="footer__link"
            onClick={scrollToTop}
          >
            CONTACTS
          </Link>
          <Link
            to="/#"
            className="footer__link"
            onClick={scrollToTop}
          >
            RIGHTS
          </Link>
        </div>
      </div>

      <div className="footer__button_container">
        <div className="footer__content">
          <div className="footer__button_text">Back to top</div>
        </div>
        <button
          type="button"
          aria-label="Scroll top"
          className="footer__button"
          onClick={scrollToTop}
        />
      </div>
    </footer>
  );
};
