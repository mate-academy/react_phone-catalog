import { NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const handleClickToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="main-container">
        <div className="footer__content">
          <NavLink
            to="home"
            className="footer__logo"
          >
            <img src="icons/logo.svg" alt="logo" />
          </NavLink>
          <div className="links">
            <a
              href="https://github.com/andriimelnyq"
              className="links__item"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a
              href="mailto:andriimelnyq@gmail.com"
              className="links__item"
              target="_blank"
              rel="noreferrer"
            >
              Contacts
            </a>
            <a
              href="https://github.com/andriimelnyq"
              className="links__item"
              target="_blank"
              rel="noreferrer"
            >
              Rights
            </a>
          </div>

          <button
            type="button"
            className="back-to-top"
            onClick={handleClickToTop}
          >
            <p className="back-to-top__title">Back to top</p>
            <img
              src="icons/arrow.svg"
              alt="top arrow"
              className="back-to-top__image"
            />
          </button>
        </div>

      </div>
    </footer>
  );
};
