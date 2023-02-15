import { Link, useLocation } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  const location = useLocation();

  return (
    <div className="footer">
      <div className="footer__content">
        <Link to="/" className="footer__logo">
          <img src="../../img/logo.svg" alt="logo" className="logo" />
        </Link>

        <div className="footer__list">
          <a
            href="https://github.com/"
            target="_blank"
            className="footer__item"
            rel="noreferrer"
          >
            GITHUB
          </a>
          <Link to="/contacts" className="footer__item">CONTACTS</Link>
          <Link to="/rights" className="footer__item">RIGHTS</Link>
        </div>

        <div className="footer__up">
          <Link
            className="footer__text"
            onClick={() => window.scrollTo(0, 0)}
            to={`${location.pathname}`}
          >
            Back to top
          </Link>

          <button
            type="button"
            className="footer__button"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img src="../../img/arrowUp.svg" alt="up" />
          </button>
        </div>
      </div>
    </div>
  );
};
