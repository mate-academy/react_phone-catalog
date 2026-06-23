import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <Link to="/">
          <img src="./img/logo.png" alt="logo" className="footer__logo" />
        </Link>

        <div className="footer__contacts">
          <a
            rel="noreferrer"
            href="https://github.com/vnechepurenko2005"
            className="footer__contacts-link"
            target="_blank"
          >
            Github
          </a>
          <a
            rel="noreferrer"
            href="mailto:fablevlados@gmail.com"
            className="footer__contacts-link"
            target="_blank"
          >
            {t('contacts')}
          </a>
          <a
            rel="noreferrer"
            href="#"
            className="footer__contacts-link"
            target="_blank"
          >
            {t('rights')}
          </a>
        </div>

        <div className="footer__navigation">
          <div className="footer__navigation-title" onClick={handleScrollToTop}>
            {t('to-top')}
          </div>
          <button
            className="footer__navigation-button"
            onClick={handleScrollToTop}
            type="button"
          />
        </div>
      </div>
    </footer>
  );
};
