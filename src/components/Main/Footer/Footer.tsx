import classNames from 'classnames';
import { Logo } from '../../Icons/Logo';
import style from './Footer.module.scss';
import { IconUp } from '../../Icons/IconUp';
import { useContext } from 'react';
import { LanguageContext } from '../../../store/LanguageProvider';
import { ThemeContext } from '../../../store/ThemeProvider';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export const Footer = () => {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const footerNavList = ['gitHub', 'contacts', 'rights'];
  // const { pathname } = useLocation();

  return (
    <footer
      className={classNames(style.footer, {
        [style.footer__darkTheme]: theme,
      })}
    >
      <nav className={style.footer__navContainer}>
        <Link to="#" className={style.footer__logoLink}>
          <Logo className={style.footer__logoImage} />
        </Link>

        <ul className={style.footer__navList}>
          {footerNavList.map(item => (
            <li className={style.footer__navItem} key={item}>
              <Link to="#" className={style.footer__navLink}>
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <div className={style.footer__upNav}>
          <HashLink smooth to="#" className={classNames(style.footer__upLink)}>
            {t('backToTop')}
          </HashLink>
          <HashLink smooth to="#" className={style.footer__arrowUpLink}>
            <IconUp className={style.footer__arrowUpImg} />
          </HashLink>
        </div>
      </nav>
    </footer>
  );
};
