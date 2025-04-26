import './Footer.scss';
import logo from '../../images/logo/logo-header.svg';
import logoDark from '../../images/logo/logo_dark.svg';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useAppSelector(state => state.theme);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="Footer">
      <div className="container">
        <div className="Footer__content">
          <div className="Footer__logo">
            <Link to="/" className="Footer__logo-link">
              <img
                className="Footer__logo-img"
                src={theme === 'light-theme' ? logo : logoDark}
                alt="Logo"
              />
            </Link>
          </div>

          <div className="Footer__nav">
            <ul className="Footer__nav-list">
              <li className="Footer__nav-item">
                <Link
                  to="https://github.com/Igor-Yaremchuk"
                  className="Footer__nav-item-link"
                  target="blank"
                >
                  GITHUB
                </Link>
              </li>
              <li className="Footer__nav-item">{t('footer.contacts')}</li>
              <li className="Footer__nav-item">{t('footer.rights')}</li>
            </ul>
          </div>

          <div
            className={classNames('Footer__button', {
              'Footer__button-hiden': !isScrolled,
            })}
          >
            <p className="Footer__button-text">{t('footer.backToTop')}</p>
            <button className="Footer__button-link" onClick={goTop}>
              <img
                src={theme === 'light-theme' ? arrow : arrowDark}
                alt="ArrowUp"
                className="Footer__button-img"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
