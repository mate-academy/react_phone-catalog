import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import logoDark from '../../assets/images/Logo-phone-version.svg';
import logoLight from '../../assets/images/Logo.svg';

import icons from '../../assets/icons/icons.svg';
import { Container } from '../Container';
import { useTheme } from '../../store/ThemeContext';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { theme } = useTheme();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <Link className={styles.logoFooter} to="/">
            <img
              src={theme === 'light' ? logoLight : logoDark}
              alt="LogoFooter"
            />
          </Link>

          <nav className={styles.footerNav}>
            <a
              href="https://github.com/Ehulinian"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerNavLink}
            >
              Github
            </a>

            <a
              href="https://github.com/Ehulinian?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerNavLink}
            >
              Contacts
            </a>
            <Link to="/rights" className={styles.footerNavLink}>
              Rights
            </Link>
          </nav>

          <div className={styles.footerButton}>
            <span>Back to top</span>
            <button className={styles.footerBackIcon} onClick={scrollToTop}>
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
