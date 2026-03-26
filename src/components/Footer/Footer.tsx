import footer from './Footer.module.scss';
import { Link, NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className={footer.footer}>
      <div className={footer.footer__content}>
        <Link to="/" className={footer.footer__logo}>
          <img
            src="/public/img/my/logo.svg"
            alt=""
            className={footer.footer__logo__img}
          />
        </Link>
        <nav className={footer.footer__nav}>
          <ul className={footer.footer__nav__list}>
            <li className={footer.footer__nav__item}>
              <NavLink
                to="https://github.com/ivan1302/react_phone-catalog"
                target="_blank"
                className={footer.footer__nav__link}
              >
                Github
              </NavLink>
            </li>
            <li className={footer.footer__nav__item}>
              <NavLink to="/" className={footer.footer__nav__link}>
                Contacts
              </NavLink>
            </li>
            <li className={footer.footer__nav__item}>
              <NavLink to="/" className={footer.footer__nav__link}>
                Rights
              </NavLink>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className={footer.footer__icon}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};
