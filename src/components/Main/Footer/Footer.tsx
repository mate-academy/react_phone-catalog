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
  const footerNavList = ['gitHub', 'contacts', 'rights'];

  return (
    <footer
      className={classNames(style.footer, {
        [style.footer__darkTheme]: theme,
      })}
    >
      <nav className={style.footer__navContainer}>

        <a href="#" className={style.footer__logoLink}>
          <Logo className={style.footer__logoImage} />
        </a>

        <ul className={style.footer__navList}>
          {footerNavList.map(item => (
            <li className={style.footer__navItem}>
              <a href="#" className={style.footer__navLink}>
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className={style.footer__upNav}>
          <a
            href="#"
            className={classNames(
              style.footer__navLinkMod,
            )}
          >
            {t('backToTop')}
          </a>
          <a href="#" className={style.footer__arrowUpLink}>
            <ArrowUp className={style.footer__arrowUpImg} />
          </a>
        </div>
      </nav>
    </footer>
  );
};
