import { Link } from 'react-router-dom';
import styles from './FooterNav.module.scss';

export const FooterNav: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link
        to="https://github.com/JaneShavrukova/react_phone-catalog"
        target="_blank"
        className={styles.navbarLink}
      >
        GitHub
      </Link>
      <Link to="/contacts" className={styles.navbarLink}>
        Contacts
      </Link>
      <Link
        to="https://github.com/JaneShavrukova"
        target="_blank"
        className={styles.navbarLink}
      >
        Rights
      </Link>
    </nav>
  );
};
