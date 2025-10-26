import cn from 'classnames';
import styles from './Footer.module.scss';
import { Button } from '../Button';
import { Icon } from '../Icon/Icon';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        {/* Лого */}
        <div className={cn(styles.footer__section, styles['footer__section--logo'])}>
          <img src="/img/logo.svg" alt="logo" className={styles.footer__logo} />
        </div>

        {/* Навігація */}
        <nav className={cn(styles.footer__section, styles['footer__section--nav'])}>
          <ul className={styles.footer__nav}>
            <li className={styles['footer__nav-item']}>
              <a href="https://github.com" className={styles['footer__nav-link']} target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </li>
            <li className={styles['footer__nav-item']}>
              <a href="#" className={styles['footer__nav-link']}>
                Contacts
              </a>
            </li>
            <li className={styles['footer__nav-item']}>
              <a href="#" className={styles['footer__nav-link']}>
                Rights
              </a>
            </li>
          </ul>
        </nav>

        {/* Кнопка «Back to top» */}
        <div className={cn(styles.footer__section, styles['footer__section--back'])}>
          <button
            onClick={scrollToTop}
            className={styles['footer__back-link']}
            type="button"
          >
            Back to top
          </button>
          <Button variant="icon" aria-label="Back to top" onClick={scrollToTop}>
            <Icon name="arrow-up" />
          </Button>
        </div>
      </div>
    </footer>
  );
};
