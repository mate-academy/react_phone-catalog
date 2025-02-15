import { Logo } from '@components/Logo';
import { BackToTop } from '../BackToTop';

import styles from './Footer.module.scss';

const FOOTER_LINKS = ['Github', 'Contacts', 'Rights'];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__logo}>
          <Logo footer />
        </div>

        <div className={styles.footer__links}>
          {FOOTER_LINKS.map(link => (
            <a
              key={link}
              className={styles.footer__link}
              href="https://github.com/maksym2493"
            >
              {link}
            </a>
          ))}
        </div>

        <div className={styles['footer__back-to-top']}>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
