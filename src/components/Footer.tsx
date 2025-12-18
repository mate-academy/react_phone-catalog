import React from 'react';
import './Footer.scss';
import { useLang } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { lang, setLang } = useLang();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Логотип */}
        <div className="footer__logo">
          <img src="/img/Logo.svg" alt="Nice Gadgets" />
        </div>

        {/* Навигация */}
        <nav className="footer__nav">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GITHUB
          </a>
          <a href="#contacts">CONTACTS</a>
          <a href="#rights">RIGHTS</a>
        </nav>

        <div className="footer__lang">
          <button className="footer__lang-1" onClick={() => setLang('en')}>
            EN
          </button>
          <button className="footer__lang-2" onClick={() => setLang('ua')}>
            UA
          </button>
          <p>Current {lang}</p>
        </div>

        {/* Кнопка вверх */}
        <button
          className="footer__back-to-top"
          onClick={handleScrollToTop}
          aria-label="Back to top"
        >
          <span>Back to top</span>
          <div className="footer__arrow">
            <img src="/img/icons/up.svg" alt="Up" />
          </div>
        </button>
      </div>
    </footer>
  );
};
