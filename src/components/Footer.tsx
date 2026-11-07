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

  const handleLanguageChange = (nextLanguage: 'en' | 'ua') => {
    if (language !== nextLanguage) {
      toggleLanguage();
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <a href={import.meta.env.BASE_URL} className="footer__logo">
          <img
            src={`${import.meta.env.BASE_URL}favicon.png`}
            alt="NICE GADGETS"
            className="footer__logo-image"
          />
          <span className="footer__logo-text">NICE GADGETS</span>
        </a>

        <nav className="footer__links" aria-label="Footer navigation">
          <a
            href="https://github.com/KOliinyk/"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            {t('github') || 'GITHUB'}
          </a>

          <a href="#contacts" className="footer__link">
            {t('contacts') || 'CONTACTS'}
          </a>

          <a href="#rights" className="footer__link">
            {t('rights') || 'RIGHTS'}
          </a>
        </nav>

        <div className="footer__language">
          <div className="footer__language-buttons">
            <button
              type="button"
              className={`footer__language-option ${
                language === 'en' ? 'is-active' : ''
              }`}
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </button>

            <button
              type="button"
              className={`footer__language-option ${
                language === 'ua' ? 'is-active' : ''
              }`}
              onClick={() => handleLanguageChange('ua')}
            >
              UA
            </button>
          </div>

          <span className="footer__language-status">
            Current {language}
          </span>
        </div>

        <button
          type="button"
          className="footer__button"
          onClick={handleBackToTop}
        >
          <span>{t('backToTop')}</span>
          <span className="footer__button-icon" aria-hidden="true">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
};