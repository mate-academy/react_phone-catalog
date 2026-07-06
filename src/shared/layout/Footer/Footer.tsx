import styles from './Footer.module.scss';
import { Logo } from '../../ui/logo';
import { Link } from 'react-router-dom';
import { BackToTopButton } from '../../ui/buttons/backToTop/BackToTopButton';

const gitHub = 'https://github.com/anastasiiaboreiko/react_phone-catalog';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Logo linkClassName={styles.footerLogo} />

        <nav className={`uppercase ${styles.footerNav}`}>
          <a
            href={gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Github
          </a>
          <Link to="contacts" className={styles.footerLink}>
            Contacts
          </Link>
          <Link to="rights" className={styles.footerLink}>
            Rights
          </Link>
        </nav>

        <BackToTopButton className={styles.footerButton} />
      </div>
    </footer>
  );
};
