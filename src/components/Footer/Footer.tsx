import './Footer.scss';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../helpers/constants';

export const Footer = () => {
  const email = 'lubomircucvara@gmail.com';
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <Link to="/" className="footer__logo">
          <img
            className="footer__image"
            src={`${IMAGE_BASE_URL}/img/header/Logo.svg`}
            alt="Logo"
          />
        </Link>

        <div className="footer__links">
          <ul className="footer__list">
            <li className="footer__item">
              <a
                className="footer__link"
                href="https://github.com/Liubomyr19/"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href={`mailto:${email}`}
                target="_blank"
                rel="noreferrer"
              >
                Contacts
              </a>
            </li>
            <li>
              <Link
                to="/"
                className="footer__link"
              >
                Rights
              </Link>
            </li>
          </ul>
        </div>

        <button
          className="footer__actions"
          type="button"
          onClick={scrollTop}
        >
          <span className="footer__label">Back to top</span>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <div
            className="button footer__button"
          >
            <i className="icon icon--arrow-top" />
          </div>
        </button>
      </div>
    </footer>
  );
};
