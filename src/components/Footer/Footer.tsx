import styles from './Footer.module.scss';
import logo from '../../assets/icons/logo.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <Link to="/" className={styles.footerLogo}>
        <img src={logo} alt="Nice gadgets logo" />
      </Link>
    </footer>
  );
};
