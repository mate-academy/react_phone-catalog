import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import logoDarkTheme from '../../img/night_theme_logo.png';
import styles from './Footer.module.scss';
import { ArrowButton } from '../ArrowButton';
import { ArrowType } from '../../utils/types';
import { useTheme } from '../../context/ThemeContext';

export const Footer = () => {
  const { isDarkTheme } = useTheme();

  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.footer__logo}>
        {isDarkTheme ? (
          <img src={logoDarkTheme} alt="page logo" />
        ) : (
          <img src={logo} alt="page logo" />
        )}
      </Link>
      <div className={styles.footer__contacts}>
        <Link
          className={styles.footer__contact}
          to={'https://github.com/Victoriia-Melnyk'}
          target="_blank"
        >
          github
        </Link>
        <Link
          className={styles.footer__contact}
          to={'mailto: melnychka1993@gmail.com'}
          target="_blank"
        >
          contacts
        </Link>
        <Link
          className={styles.footer__contact}
          to={'https://github.com/Victoriia-Melnyk'}
          target="_blank"
        >
          rights
        </Link>
      </div>
      <div className={styles.footer__back}>
        <p className={styles['footer__back-title']}>Back to top</p>
        <a href="#top">
          <ArrowButton type={ArrowType.up} />
        </a>
      </div>
    </footer>
  );
};
