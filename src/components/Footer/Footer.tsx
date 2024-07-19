import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/nuce-gadgets-logo.png';
import logoDark from '../../images/nuce-gadgets-logo--dark.png';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeContext';

const backToTop = () => {
  window.scrollTo({ top: 0 });
};

export const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link
            to="/"
            className="footer__logo"
            title={t(TRANSLATIONS.logo.title)}
            aria-label={t(TRANSLATIONS.logo.ariaLabel)}
          >
            <img
              src={theme === 'dark-theme' ? logo : logoDark}
              alt={t(TRANSLATIONS.logo.alt)}
              className="footer__logo-img"
            />
          </Link>

          <nav className="nav">
            <ul className="nav__list footer__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className="nav__link footer__link"
                  aria-label={t(TRANSLATIONS.footer.nav.github.ariaLabel)}
                >
                  {t(TRANSLATIONS.footer.nav.github.text)}
                </NavLink>
              </li>

              <li className="nav__item">
                <NavLink
                  to="/contacts"
                  className="nav__link footer__link"
                  aria-label={t(TRANSLATIONS.footer.nav.contacts.ariaLabel)}
                >
                  {t(TRANSLATIONS.footer.nav.contacts.text)}
                </NavLink>
              </li>

              <li className="nav__item">
                <NavLink
                  to="/rights"
                  className="nav__link footer__link"
                  aria-label={t(TRANSLATIONS.footer.nav.rights.ariaLabel)}
                >
                  {t(TRANSLATIONS.footer.nav.rights.text)}
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="footer__back-to-top">
            <button
              type="button"
              className="btn--back-to-top"
              onClick={backToTop}
              title={t(TRANSLATIONS.footer.backToTop.title)}
              aria-label={t(TRANSLATIONS.footer.backToTop.ariaLabel)}
            >
              {t(TRANSLATIONS.footer.backToTop.text)}
            </button>

            <button
              type="button"
              className="btn btn--slider btn--square-sm"
              onClick={backToTop}
              title={t(TRANSLATIONS.footer.backToTop.title)}
              aria-label={t(TRANSLATIONS.footer.backToTop.ariaLabel)}
            >
              <span className="icon icon--arrow-up"></span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
