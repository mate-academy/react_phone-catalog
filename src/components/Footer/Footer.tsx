import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Icon } from '../Icon';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* Logo */}
        <Link to="/" className={styles.logoLink}>
          <Icon name="Logo" format="png" className={styles.logo} />
        </Link>

        {/* Contacts */}
        <div className={styles.contacts}>
          <Link to="https://github.com/Bo-oV" className={styles.contactsLink}>
            Github
          </Link>

          <Link
            to="mailto:marlana08022022@gmail.com"
            className={styles.contactsLink}
          >
            Contacts
          </Link>

          <Link to="#" className={styles.contactsLink}>
            Rights
          </Link>
        </div>

        {/* Back to top */}
        <div className={styles.navigation}>
          <div className={styles.navigationTitle}>Back to top</div>

          <button
            type="button"
            className={styles.navigationButton}
            onClick={handleBackToTop}
            aria-label="Back to top"
          />
        </div>
      </div>
    </footer>
  );
};
