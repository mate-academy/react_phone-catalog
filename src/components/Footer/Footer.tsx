import { Logo, Navigation } from '../SheredNavigation';
import { footerLinks } from '../../constants/footerLinks';
import styles from './Footer.module.scss';
import { BackToTopButton } from '../BackToTopButton';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.footerNav}>
          <Navigation links={footerLinks} view="footer" />
        </div>

        <div className={styles.backToTop}>
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
};
