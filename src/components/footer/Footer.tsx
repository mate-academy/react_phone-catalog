import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Navbar } from '../navbar';
import { BackToTop } from './сomponents';

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Link to="/" className={styles.footer__logo}>
          <img
            className={styles.footer__logoimage}
            src="../../img/icons/main-logo.svg"
            alt="LOGO"
          />
        </Link>

        <Navbar isOpen={false} withoutUnderline={true} />

        <BackToTop />
      </footer>
    </>
  );
};
