import styles from './Footer.module.scss';
import { NavBarFooter } from './NavBarFooter';
import { Button } from './NavBarFooter/Button';
import { LogoFooter } from '././LogoFooter';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.line} />
      <div className={styles.logo}>
        <LogoFooter />
      </div>

      <div className={styles.nav}>
        <NavBarFooter />
      </div>

      <div className={styles.switcher}>
        <ThemeSwitcher />
      </div>

      <div className={styles.button}>
        <Button />
      </div>
    </footer>
  );
};
