import { NavLink } from 'react-router-dom';

import '../Header/Header.scss';
import './Footer.scss';

export const Footer = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__logo">
        <NavLink to="/" className="nav__logo">
          <span className="logo" />
        </NavLink>
      </div>
      <div className="footer__menu">
        <a
          href="https://github.com/Ukrainiane-panda"
          className="nav__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="https://github.com/Ukrainiane-panda"
          className="nav__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contacts
        </a>
        <a
          href="https://github.com/Ukrainiane-panda"
          className="nav__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rights
        </a>
      </div>
      <button
        type="button"
        className="button button-link"
        onClick={handleClick}
      >
        <p className="button__text">Back to top</p>
        <span
          className="icon icon-back"
        />
      </button>

    </footer>
  );
};
