// #region imports
import { Link } from 'react-router-dom';
import { HomeLink } from '../HomeLink';
import { TopButton } from './components/TopButton';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';
// #endregion

interface FooterLink {
  label: string;
  to: string;
}

export const Footer = () => {
  const { t } = useTranslation('footer');

  const links: FooterLink[] = [
    {
      label: 'github',
      to: 'https://yuliia-nudyk.github.io/react_phone-catalog/',
    },
    { label: t('contacts'), to: 'https://github.com/yuliia-nudyk' },
    { label: t('rights'), to: 'https://www.samsung.com/ua/' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <HomeLink size="medium" variant="accent" />

        <ul className={styles.navList}>
          {links.map(({ label, to }) => (
            <Link to={to} className={styles.navLink} key={label}>
              {label}
            </Link>
          ))}
        </ul>

        <div className={styles.topButton}>
          <TopButton />
        </div>
      </div>
    </footer>
  );
};
