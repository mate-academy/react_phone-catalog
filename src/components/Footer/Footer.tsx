import styles from './Footer.module.scss';
import logo from '../../../public/img/icons/logo.svg';
import { RoutesLink } from '../../types/routes';
import { TransitionLink } from '../TransitionLink';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <TransitionLink to={RoutesLink.HomePage}>
            <img src={logo} alt="The logo of Nice Gadgets" />
          </TransitionLink>
        </div>
        <nav className={styles.footerNav}>
          <a className={styles.footerLink} href="https://github.com/vlad14982">
            Github
          </a>
          <a className={styles.footerLink} href="https://github.com/vlad14982">
            Contacts
          </a>
          <a className={styles.footerLink} href="https://github.com/vlad14982">
            Rights
          </a>
        </nav>
        <div className={styles.footerBackToTop}>
          <p className={styles.footerBackToTopTitle}>Back to top</p>
          <button
            className={styles.footerBackToTopBtn}
            onClick={handleBackToTop}
          >
            <img src="img/icons/back_to_top.svg" alt="Icon back to top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
