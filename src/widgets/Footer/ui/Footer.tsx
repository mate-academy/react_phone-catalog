import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import { FooterButton, FooterNavigation } from '.';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.logo}>
        <img src="api/logo.svg" alt="Store logo" tabIndex={-1} />
      </Link>
      <FooterNavigation />
      <FooterButton />
    </footer>
  );
};
