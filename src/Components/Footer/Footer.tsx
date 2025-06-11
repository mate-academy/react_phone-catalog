import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollToTop';
import './Footer.scss';
import classNames from 'classnames';

const LINKS = [
  {
    title: 'Github',
    url: 'https://github.com/MRKucherenko',
  },
  {
    title: 'Contacts',
    url: 'https://github.com/MRKucherenko',
  },
  {
    title: 'Rights',
    url: 'https://github.com/MRKucherenko',
  },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <NavLink
          to="/"
          className={({ isActive }) =>
            classNames('header__logo-link', {
              'header__logo-link--active': isActive,
            })
          }
        >
          <img src="logo.svg" alt="Logo" className="header__logo" />
        </NavLink>

        <div className="footer__links">
          {LINKS.map(link => (
            <a
              key={link.title}
              href={link.url}
              target="_"
              className="footer__links-link text-button"
            >
              {link.title}
            </a>
          ))}
        </div>

        <button
          className="footer__back-to-top button--text"
          onClick={scrollToTop}
        >
          <p className="small-text footer__back-to-top-text">Back to top</p>
          <img
            className="button--arrow"
            src="./public/icons/arrow_up.svg"
            alt="Arrow up"
          />
        </button>
      </div>
    </footer>
  );
};
