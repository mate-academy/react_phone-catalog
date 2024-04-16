import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Navbar } from '../../components/Navbar';
import { footerLinks } from '../../helpers/constArrs';
import { BackToTop } from './components/BackToTop/BackToTop';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link className={styles.footerLogo} to={'/'}>
        <img src="/img/icons/footerLogo_icon.svg" alt="footerLogo_icon" />
      </Link>

      <nav className={styles.footerNav}>
        <Navbar links={footerLinks} />
      </nav>

      <div>
        <BackToTop />
      </div>
    </footer>
  );
};
