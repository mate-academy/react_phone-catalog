import { Link } from 'react-router-dom';
import { IconButton } from '../IconButton';
import { useTheme } from '../../context/ThemeContext';
import styles from './Footer.module.scss';

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <Link to="/" className={styles['footer__logo-wrapper']}>
          <img
            src={
              theme === 'light'
                ? './img/icons/logo.svg'
                : './img/icons/logo-dark.svg'
            }
            alt={theme === 'light' ? 'Logo' : 'Logo dark'}
            className={styles.footer__logo}
          />
        </Link>

        <div className={styles.footer__container}>
          <Link
            to="https://github.com/yuliafito"
            className={styles.footer__link}
            target="_blank"
          >
            GitHub
          </Link>

          <Link
            to="https://github.com/yuliafito"
            className={styles.footer__link}
            target="_blank"
          >
            Contacts
          </Link>

          <Link
            to="https://github.com/yuliafito"
            className={styles.footer__link}
            target="_blank"
          >
            Rights
          </Link>
        </div>

        <div
          className={styles['footer__back-to-top']}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className={styles['footer__button-title']}>Back to top</span>

          <IconButton icon="arrow_left" rotated />
        </div>
      </div>
    </footer>
  );
};
