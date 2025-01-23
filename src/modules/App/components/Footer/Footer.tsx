import styles from './Footer.module.scss';

import { Logo } from '@components/Logo';
import { BackToTop } from '../BackToTop';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__grid}>
          <div className={styles.footer__logo}>
            <Logo footer />
          </div>

          <div className={styles.footer__links}>
            <a href="#">Github</a>

            <a href="#">Contacts</a>

            <a href="#">Rights</a>
          </div>

          <div className={styles['footer__back-to-top']}>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
};
