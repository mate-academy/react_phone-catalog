import { useLanguage } from '../context/LanguageContext';

import './Footer.scss';

export const Footer = () => {
  const { language, toggleLanguage, t } = useLanguage();

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <a href={import.meta.env.BASE_URL} className="footer__logo">
        <img
          src={`${import.meta.env.BASE_URL}favicon.png`}
          alt="Phone Catalog"
          className="footer__logo-image"
        />
      </a>

      <div className="footer__links">
        <a
          href="https://github.com/KOliinyk/"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          {t('github')}
        </a>

        <a
          href="https://github.com/KOliinyk/"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          {t('contacts')}
        </a>

        <span className="footer__rights">© 2026 {t('rights')}</span>
      </div>

      <button
        type="button"
        className="footer__language-button"
        onClick={toggleLanguage}
        aria-label="Toggle language"
      >
        {language.toUpperCase()}
      </button>

      <button
        type="button"
        className="footer__button"
        onClick={handleBackToTop}
      >
        {t('backToTop')} ↑
      </button>
    </footer>
  );
};
