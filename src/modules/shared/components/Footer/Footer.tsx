import { Logo } from '../Logo/Logo';
import styles from './Footer.module.scss';
import { BackToTop } from './components/BackToTop';
import { FooterNav } from './components/FooterNav/FooterNav';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Logo className={styles.footerLogo} />

          <FooterNav />

          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
