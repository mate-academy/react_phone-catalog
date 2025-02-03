import { NavLink } from 'react-router-dom';

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => {
  return (
    <footer className="footer">
      <NavLink to={'/'}>
        <div className="footer__logo"></div>
      </NavLink>
      <div className="footer__navigation">
        <div className="footer__navigation__list">
          <a
            href="https://github.com/manch0ffline"
            className="footer__navigation__item"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href="https://github.com/manch0ffline"
            className="footer__navigation__item"
            target="_blank"
            rel="noreferrer"
          >
            Contacts
          </a>
          <a
            href="https://github.com/manch0ffline"
            className="footer__navigation__item"
            target="_blank"
            rel="noreferrer"
          >
            Rights
          </a>
        </div>
      </div>
      <div className="footer__button" onClick={handleScrollToTop}>
        <label htmlFor="footer__button" className="footer__button--text">
          Back to top
        </label>
        <div id="footer__button" className="footer__button__icon-link">
          <div
            className="
              footer__button__icon
              icon
              icon--array--right--light
            "
          ></div>
        </div>
      </div>
    </footer>
  );
};
