import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { ChevronUp } from 'lucide-react';
import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

const FOOTER_LINKS = [
  {
    to: 'https://github.com/YuliiaKosenchuk/react_phone-catalog',
    key: 'footer.github',
  },
  { to: 'mailto:your.email@gmail.com', key: 'footer.contacts' },
  { to: '/rights', key: 'footer.rights' },
];

export const Footer = () => {
  const { t } = useTranslation('common');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <Logo />

          <ul className={styles.linksList}>
            {FOOTER_LINKS.map(({ to, key }) => (
              <NavLink key={key} to={to} className={styles.link}>
                {t(key)}
              </NavLink>
            ))}
          </ul>

          <button className={styles.backToTop} onClick={scrollToTop}>
            <span>{t('btn.back')}</span>
            <div className={styles.iconWrap}>
              <ChevronUp size={16} strokeWidth={2} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
