import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import Logo from '../../assets/icons/Logo.svg';
import LogoBlack from '../../assets/icons/Logo-black.svg';
import ArrowUp from '../../assets/icons/Chevron (Arrow Left).svg';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  theme: 'light' | 'dark';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  const logo = theme === 'dark' ? LogoBlack : Logo;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerInner}>
          <div className={styles.logoContainer}>
            <NavLink to="/">
              <img src={logo} alt={t('footer.logoAlt')} />
            </NavLink>
          </div>

          <nav className={styles.nav}>
            <a
              href="https://github.com/Diana2369/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.github')}
            </a>
            <NavLink to="/contacts">{t('footer.contacts')}</NavLink>
            <NavLink to="/rights">{t('footer.rights')}</NavLink>
          </nav>

          <div className={styles.backToTop}>
            <span>{t('footer.backToTop')}</span>
            <div
              role="button"
              tabIndex={0}
              onClick={scrollToTop}
              onKeyDown={handleKeyDown}
              className={styles.scrollButton}
            >
              <img src={ArrowUp} alt={t('footer.backToTop')} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
