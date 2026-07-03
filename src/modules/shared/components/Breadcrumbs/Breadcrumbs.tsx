//#region imports
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './components/ArrowRightIcon';
import { HomeIcon } from './components/HomeIcon';
import baseStyles from './base.module.scss';
import styles from './Breadcrumbs.module.scss';
import { useTranslation } from 'react-i18next';
//#endregion

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  const { t } = useTranslation('shared');

  return (
    <nav aria-label={t('breadcrumbs')}>
      <ol className={`${baseStyles.navList} ${styles.navList}`}>
        <li>
          <Link to={'/'} className={styles.homeLink} aria-label={t('home')}>
            <HomeIcon />
          </Link>
        </li>

        {items.map((item, i) => (
          <li key={item.label} className={baseStyles.navItem}>
            <ArrowRightIcon />

            {item.to ? (
              <Link to={item.to} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span
                className={styles.label}
                aria-current={i === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
