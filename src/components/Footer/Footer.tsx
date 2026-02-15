import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import stylesNav from '../../styles/nav.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import stylesBtn from '../../styles/button.module.scss';
import { Logo } from '../Logo/Logo';
import { translate } from '../../utils/translate';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { useAppSelector } from '../../app/hooks';

export const Footer = () => {
  const { lang } = useContext(LangContext);
  const { darkTheme } = useAppSelector(state => state.darkTheme);

  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <Logo />
        <nav className={styles.footer__nav}>
          <ul className={styles.footer__nav__list}>
            <li className={styles.footer__list__item}>
              <Link
                to="https://github.com/AndreaTkachuk/react_phone-catalog/"
                className={stylesNav.nav__link}
              >
                Github
              </Link>
            </li>
            <li className={styles.footer__list__item}>
              <Link
                to="mailto:andrii.tkachuk.fs@gmail.com"
                className={stylesNav.nav__link}
              >
                {translate('footer.link.contacts', lang)}
              </Link>
            </li>
            <li className={styles.footer__list__item}>
              <Link
                to="https://github.com/AndreaTkachuk/react_phone-catalog/"
                className={stylesNav.nav__link}
              >
                {translate('footer.link.rights', lang)}
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.footer__backTop}>
          <p>{translate('footer.button', lang)}</p>
          <div
            className={`${stylesIcon.icon} ${stylesBtn.button} ${stylesBtn.button__backTop} ${darkTheme ? stylesIcon.icon__backTop__dark : stylesIcon.icon__backTop}`}
            onClick={() => window.scrollTo(0, 0)}
          ></div>
        </div>
      </div>
    </div>
  );
};
