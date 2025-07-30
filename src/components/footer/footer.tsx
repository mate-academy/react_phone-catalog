import { icons } from '../../constants/icons';
import { Icon } from '../icons';
import { Logo } from '../logo';
import styles from './footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <Logo />
          <nav className={styles.footerNav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a href="#" className={styles.navLink}>
                  Github
                </a>
              </li>
              <li className={styles.navItem}>
                <a href="#" className={styles.navLink}>
                  Contacts
                </a>
              </li>
              <li className={styles.navItem}>
                <a href="#" className={styles.navLink}>
                  rights
                </a>
              </li>
            </ul>
          </nav>
          <div className={styles.footerButton}>
            <button className={styles.buttonLink} onClick={scrollToTop}>
              <span className={styles['buttonLink-text']}>Back to top</span>
              <div className={styles['button-img']}>
                <Icon icon={icons.arrowUp} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
