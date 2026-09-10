import styles from './Footer.module.scss';
import { Logo } from '@/shared/components/Logo';
import { IconButton } from '@/shared/components/IconButton';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Logo className={styles.logo} />

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a
                href="https://github.com/Kobeliukh/react_phone-catalog"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                Github
              </a>
            </li>

            <li className={styles.navItem}>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                Contacts
              </a>
            </li>

            <li className={styles.navItem}>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div
          className={styles.toTopButton}
          onClick={() => scroll({ top: 0, behavior: 'smooth' })}
        >
          <span className={styles.toTopButtonName}>Back to top</span>
          <IconButton variant="arrow" />
        </div>
      </div>
    </footer>
  );
};
