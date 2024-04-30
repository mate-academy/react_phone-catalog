import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const ScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__logo--block">
            <div className="footer__logo icon icon--logo"></div>
          </div>
          <div className="footer__list">
            <Link
              to={'https://github.com/mate-academy/react_phone-catalog'}
              target="_blank"
              className="footer__list--link uppercase"
            >
              Github
            </Link>
            <p className="footer__list--link uppercase">{t('Contacts')}</p>
            <p className="footer__list--link uppercase">{t('Rights')}</p>
          </div>
          <div className="footer__button--block">
            <button className="footer__button small-text" onClick={ScrollToTop}>
              {t('to top')}
              <div className="footer__button--top button-slider"></div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
