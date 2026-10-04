import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';
import container from '@/shared/styles/Container.module.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={container.container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__logoWrapper}>
            <Logo />
          </div>

          <div className={styles.FooterLinks}>
            <li className={styles.element}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li className={styles.element}>
              <a href="">{t('footer.nav.contacts')}</a>
            </li>
            <li className={styles.element}>
              <a href="">{t('footer.nav.rights')}</a>
            </li>
          </div>
          <div className={styles.buttonWarapper}>
            <span className={styles.buttonText}>{t('footer.toTop')}</span>
            <Button
              icon="icons/up.svg"
              alt="toTop"
              onClick={handleScrollToTop}
              filtered
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
