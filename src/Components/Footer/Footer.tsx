import './Footer.scss';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';

export const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__container">
          <Logo />

          <ul className="footer__list">
            <li>
              <Link
                to="https://github.com/partnersinbahamas"
                className="footer__link"
                target="_blank"
              >
                github
              </Link>
            </li>

            <li>
              <Link
                to="/contacts"
                className="footer__link"
              >
                contacts
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="footer__link"
                target="_blank"
              >
                rights
              </Link>
            </li>
          </ul>

          <div className="footer__backTo">
            <p>Back to top</p>

            <button
              type="button"
              className="footer__button"
              onClick={() => scrollTop()}
            >
              <img
                src="Images/arrow-icon--left.svg"
                className="footer__button--icon"
                alt="Arrow line"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
