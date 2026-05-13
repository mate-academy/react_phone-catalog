import { Link } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import iconHome from '../../assets/icon-home.svg';
import styles from './Breadcrumbs.module.scss';

export interface Crumb {
  label: string;
  to?: string;
}

export const Breadcrumbs = ({ crumbs }: { crumbs: Crumb[] }) => {
  const t = useT();
  return (
    <nav className={styles.wrap}>
      <Link to="/" className={styles.home} aria-label={t('aria.home')}>
        <img src={iconHome} alt="" />
      </Link>
      {crumbs.map((c, i) => (
        <span key={i} className={styles.item}>
          <span className={styles.sep}>›</span>
          {c.to ? (
            <Link to={c.to} className={styles.link}>
              {c.label}
            </Link>
          ) : (
            <span className={styles.current}>{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};
