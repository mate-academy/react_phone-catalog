import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import logo from '../../assets/images/Logo-phone-version.svg';
import icons from '../../assets/icons/icons.svg';
import { Container } from '../Container';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <Link className={styles.logoFooter} to="/">
            <img src={logo} alt="LogoFooter" />
          </Link>

          <nav className={styles.footerNav}>
            <Link to={{}} className={styles.footerNavLink}>
              Github
            </Link>
            <Link to={{}} className={styles.footerNavLink}>
              Contacts
            </Link>
            <Link to={{}} className={styles.footerNavLink}>
              Rights
            </Link>
          </nav>

          <div className={styles.footerButton}>
            <span>Back to top</span>
            <button className={styles.footerBackIcon}>
              <svg className={styles.icon}>
                <use href={`${icons}#arrow-up-icon`}></use>
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
