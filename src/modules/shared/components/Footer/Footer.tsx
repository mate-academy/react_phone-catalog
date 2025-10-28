import cn from 'classnames';
import styles from './Footer.module.scss';
import { Button } from '../Button';
import { Icon } from '../Icon/Icon';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div
          className={cn(
            styles.footer__section,
            styles['footer__section--logo'],
          )}
        >
          <img src="/img/logo.svg" alt="logo" className={styles.footer__logo} />
        </div>

        <nav
          className={cn(styles.footer__section, styles['footer__section--nav'])}
        >
          <ul className={styles.footer__nav}>
            <li className={styles['footer__nav-item']}>
              <a
                href="https://github.com"
                className={styles['footer__nav-link']}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('footer.github')}
              </a>
            </li>
            <li className={styles['footer__nav-item']}>
              <a href="#" className={styles['footer__nav-link']}>
                {t('footer.contacts')}
              </a>
            </li>
            <li className={styles['footer__nav-item']}>
              <a href="#" className={styles['footer__nav-link']}>
                {t('footer.rights')}
              </a>
            </li>
          </ul>
        </nav>

        <div
          className={cn(
            styles.footer__section,
            styles['footer__section--back'],
          )}
        >
          <button
            onClick={scrollToTop}
            className={styles['footer__back-link']}
            type="button"
          >
            {t('common.backToTop')}
          </button>
          <Button
            variant="icon"
            aria-label={t('common.backToTop')}
            onClick={scrollToTop}
          >
            <Icon name="arrow-up" />
          </Button>
        </div>
      </div>
    </footer>
  );
};
