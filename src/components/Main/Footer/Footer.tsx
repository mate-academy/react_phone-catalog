import classNames from 'classnames';
import { Logo } from '../../Icons/Logo';
import style from './Footer.module.scss';
import { IconUp } from '../../Icons/IconUp';
import { useContext } from 'react';
import { LanguageContext } from '../../../store/LanguageProvider';
import { ThemeContext } from '../../../store/ThemeProvider';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { ProductsContext } from '../../../store/ProductsProvider';
import { Skeleton } from '../../Skeleton';

export const Footer = () => {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { isLoading } = useContext(ProductsContext);
  const footerNavList = [
    {
      name: 'gitHub',
      path: 'https://github.com/mrsvolodya/react_phone-catalog',
    },
    {
      name: 'contacts',
      path: 'https://www.linkedin.com/in/volodimir-murskyi-b54b45293/',
    },
    {
      name: 'rights',
      path: '#',
    },
  ];

  return (
    <footer
      className={classNames(style.footer, {
        [style.footer__darkTheme]: theme,
      })}
    >
      {!isLoading ? (
        <nav className={style.footer__navContainer}>
          <Link to="#" className={style.footer__logoLink}>
            <Logo className={style.footer__logoImage} />
          </Link>

          <ul className={style.footer__navList}>
            {footerNavList.map(item => (
              <li className={style.footer__navItem} key={item.name}>
                <Link to={item.path} className={style.footer__navLink}>
                  {t(item.name)}
                </Link>
              </li>
            ))}
          </ul>

          <div className={style.footer__upNav}>
            <HashLink
              smooth
              to="#"
              className={classNames(style.footer__upLink)}
            >
              {t('backToTop')}
            </HashLink>
            <HashLink smooth to="#" className={style.footer__arrowUpLink}>
              <IconUp className={style.footer__arrowUpImg} />
            </HashLink>
          </div>
        </nav>
      ) : (
        <Skeleton className={style.footer__navContainer} />
      )}
    </footer>
  );
};
