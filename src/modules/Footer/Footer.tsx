import { Navigation } from './Navigation';
import styles from './Footer.module.scss';
import { TopButton } from './TopButton';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__wrapper}>
          <Logo />
          <Navigation />
          <TopButton />
        </div>
      </div>
    </footer>
  );
};
