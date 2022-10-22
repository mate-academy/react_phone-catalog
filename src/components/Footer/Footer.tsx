import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__content">
        <Link to="/">
          <img
            className="logo"
            src="img/logo.svg"
            alt="logo"
          />
        </Link>
        <nav className="Footer__navblock">
          <ul className="navbar__list">
            <li className="navbar__item">
              <a
                href="https://github.com/DimaShm/react_phone-catalog/branches"
                className="link Footer__link"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB
              </a>
            </li>

            <li className="navbar__item">
              <a
                href="https://www.linkedin.com/in/dmitry-shmagin-7a652a248/"
                className="link Footer__link"
                target="_blank"
                rel="noreferrer"
              >
                CONTACTS
              </a>
            </li>

            <li className="navbar__item">
              <a
                href="https://github.com/DimaShm?tab=repositories"
                className="Footer__link link"
                target="_blank"
                rel="noreferrer"
              >
                RIGHTS
              </a>
            </li>
          </ul>
        </nav>
        <div className="Footer__up-button-block">
          <span className="small-text small-text--light">
            Back to top
          </span>

          <button
            type="button"
            aria-label="backToTop"
            className="Footer__button icon-button"
            onClick={() => window.scrollTo({
              top: 0, left: 0, behavior: 'smooth',
            })}
          >
            <div className="icon icon--arrow-up" />
          </button>
        </div>
      </div>
    </div>
  );
};
