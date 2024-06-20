import classNames from 'classnames';
import { Logo } from '../../Logos/Logo';
import style from './Footer.module.scss';
import { ArrowUp } from '../../Logos/ArrowUp';
import { useContext } from 'react';
import { LanguageContext } from '../../../store/LanguageProvider';
import { ThemeContext } from '../../../store/ThemeProvider';

export const Footer = () => {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={classNames(style.footer, {
        [style.footer__darkTheme]: theme,
      })}
    >
      <div className={style.footer__container}>
        <a href="#" className={style.footer__logoLink}>
          <Logo className={style.footer__logoImage} />
        </a>

        <nav className={style.footer__navBlock}>
          <a href="#" className={style.footer__navLink}>
            {t('gitHub')}
          </a>
          <a href="#" className={style.footer__navLink}>
            {t('contacts')}
          </a>
          <a href="#" className={style.footer__navLink}>
            {t('rights')}
          </a>
        </nav>

        <div className={style.footer__upNav}>
          <a
            href="#"
            className={classNames(
              style.footer__navLink,
              style.footer__navLinkMod,
            )}
          >
            {t('backToTop')}
          </a>
          <a href="#" className={style.footer__arrowUpLink}>
            <ArrowUp className={style.footer__arrowUpImg} />
          </a>
        </div>
      </div>
    </footer>
  );
};
