import styles from './styles/footer.module.scss';
import { NavLink } from 'react-router-dom';
import { FooterButton, FooterNavigation } from './ui';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <NavLink to="/" className={styles.logo}>
        <img src="/src/shared/icons/logo.svg" alt="Store logo" />
      </NavLink>
      <FooterNavigation />
      <FooterButton />
    </footer>
  );
};
