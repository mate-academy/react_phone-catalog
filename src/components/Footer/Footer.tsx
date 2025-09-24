import styles from './Footer.module.scss';
import { NavBarFooter } from './NavBarFooter';
import { Button } from './NavBarFooter/Button';
import { LogoFooter } from '././LogoFooter';

export const Footer = () => {
  return (
    <>
      <hr className={styles.line} />
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <LogoFooter />
        </div>

        <div className={styles.nav}>
          <NavBarFooter />
        </div>

        <div className={styles.button}>
          <Button />
        </div>
      </footer>
    </>
  );
};
