import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { useTranslate } from '../../hooks/useTranslate';
import { scrollToTop } from '../../utils/scrollToTop';
import { FOOTER_NAV_ITEMS } from '../../constants/nav';
import { LOGO } from '../../constants/logo';
import styles from './Footer.module.scss';

export const Footer = () => {
  const t = useTranslate();

  return (
    <footer className={styles.footer}>
      <div className="pageContainer">
        <nav className={styles.footerNav} aria-label="Footer navigation">
          <Link to="/" className={styles.footerLogo}>
            <img
              src={LOGO.img}
              className={styles.footerImg}
              alt="Nice Gadgets home"
            />
          </Link>

          <ul className={styles.footerList}>
            {FOOTER_NAV_ITEMS.map(item => (
              <li key={item.to} className={styles.footerItem}>
                <Link className={styles.footerLink} to={item.to} target="blank">
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.backToTop}>
            <p className={styles.backTitle}>{t('footer.back-to-top')}</p>
            <button
              type="button"
              className={styles.backToTopBtn}
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <Icon name="arrowUp" />
            </button>
          </div>
        </nav>
      </div>
    </footer>
  );
};
