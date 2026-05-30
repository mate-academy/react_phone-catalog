import './Footer.scss';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="footer__line"></div>
      <div className="footer">
        <NavLink className="footer__logo__link" aria-current="page" to="/">
          <div className="footer__logo"></div>
        </NavLink>

        <div className="footer__links">
          <NavLink
            className="footer__text footer__text--link"
            to="https://github.com/VladKugot"
          >
            {t('footer.0')}
          </NavLink>
          <NavLink
            className="footer__text footer__text--link"
            aria-current="page"
            to="/"
          >
            {t('footer.1')}
          </NavLink>
          <NavLink
            className="footer__text footer__text--link"
            aria-current="page"
            to="/"
          >
            {t('footer.2')}
          </NavLink>
        </div>

        <div className="back-top" onClick={scrollToTop}>
          <span className="back-top__title footer__text">{t('footer.3')}</span>
          <div className="back-top__img"></div>
        </div>
      </div>
    </>
  );
};
