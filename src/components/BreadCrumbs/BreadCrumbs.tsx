import { Link, useLocation } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';

const pageTitles: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const BreadCrumbs: React.FC = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  return (
    <nav className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link to="/" className={styles.breadcrumbs_link}>
            <img
              src="/img/icons/Home.png"
              alt="Home icon"
              className={styles.breadcrumbs_icon}
            />
          </Link>
        </li>

        {parts.map((part, index) => {
          const isLast = index === parts.length - 1;
          const title = pageTitles[part] || part;

          return (
            <li key={part} className={styles.breadcrumbs__item}>
              <img
                src="/img/icons/arrow_right.png"
                alt="arrow"
                className={styles.breadcrumbs_arrow}
              />
              {isLast ? (
                <span className={styles.breadcrumbs_active}>{title}</span>
              ) : (
                <Link to={`/${part}`} className={styles.breadcrumbs__link}>
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
