import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../imgs/LOGO.svg';

import { ArrowButton } from './ArrowButton';

export const Footer: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__content">
        <Link to="/" className="header__logo">
          <img src={logo} alt="" />
        </Link>

        <ul className="footer__menu">
          <li className="footer__item">
            <Link
              to="https://github.com/vasyliev-anton"
              className="footer__link"
              target="__blank"
            >
              GitHub
            </Link>
          </li>
          <li className="footer__item">
            <Link to="#/" className="footer__link">{t('contacts')}</Link>
          </li>
          <li className="footer__item">
            <Link to="#/" className="footer__link">{t('rights')}</Link>
          </li>
        </ul>

        <div className="footer__button">
          <span className="footer__button-text">{t('backToTop')}</span>
          <div
            className="footer__button-arrow"
          >
            <ArrowButton direction="up" handler={handleClick} />
          </div>
        </div>
      </div>
    </footer>
  );
};
