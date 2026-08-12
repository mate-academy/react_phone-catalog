import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { useTranslation } from '../../hooks';
import styles from './Footer.module.scss';

const footerLinks = [
  {
    labelKey: 'github',
    href: 'https://github.com/AntonyShaga/react_phone-catalog/tree/dev',
  },
  {
    labelKey: 'contacts',
    href: 'https://shaga.dev',
  },
] as const;

export const Footer = () => {
  const t = useTranslation();

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Logo />

        <nav className={styles.nav} aria-label={t.footer.footerNavigation}>
          {footerLinks.map(({ labelKey, href }) => (
            <a
              className={styles.navLink}
              href={href}
              key={labelKey}
              target="_blank"
              rel="noreferrer"
            >
              {t.footer[labelKey]}
            </a>
          ))}

          <span className={styles.navLink}>{t.footer.copyright}</span>
        </nav>

        <button
          className={styles.backToTop}
          type="button"
          aria-label={t.footer.backToTop}
          onClick={handleBackToTop}
        >
          <span className={styles.backToTopText}>{t.footer.backToTop}</span>

          <span className={styles.backToTopIcon} aria-hidden="true">
            <Icon name="chevronUp" size={16} />
          </span>
        </button>
      </div>
    </footer>
  );
};
