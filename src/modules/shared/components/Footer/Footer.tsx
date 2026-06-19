/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import arrowUp from '@/assets/svg/arrow-up.svg';
import logoIcon from '@/assets/svg/logo.svg';

import style from './Footer.module.scss';
import { Button } from '../ui/Button';
//#endregion

//#region STYLES
const {
  footer,

  logo,
  logoImg,

  nav,
  navList,
  navItem,
  navLink,

  scrollBlock,
  scrollText,
  scrollBtn,
} = style;
//#endregion

export const Footer = () => {
  // #region HOOKS
  const { t } = useTranslation();
  // #endregion

  //#region HANDLERS
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  //#endregion

  //#region RENDER
  return (
    <footer className={footer}>
      <div className="container">
        <div className={logo}>
          <Link to="/">
            <img
              src={logoIcon}
              className={logoImg}
              alt={t('footer.logo.alt')}
            />
          </Link>
        </div>

        <nav className={nav}>
          <ul className={navList}>
            <li className={navItem}>
              <a
                href="https://github.com/tavorotuk/react_phone-catalog"
                className={navLink}
                target="_blank"
                rel="noreferrer"
              >
                {t('footer.nav.github')}
              </a>
            </li>
            <li className={navItem}>
              <Link to="/contacts" className={navLink}>
                {t('footer.nav.contacts')}
              </Link>
            </li>
            <li className={navItem}>
              <Link to="/rights" className={navLink}>
                {t('footer.nav.rights')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className={scrollBlock}>
          <span className={scrollText}>{t('footer.back.text')}</span>

          <Button
            variant="icon"
            className={scrollBtn}
            aria-label={t('footer.back.aria')}
            onClick={scrollToTop}
          >
            <img src={arrowUp} alt={t('footer.back.icon')} />
          </Button>
        </div>
      </div>
    </footer>
  );
  //#endregion
};
