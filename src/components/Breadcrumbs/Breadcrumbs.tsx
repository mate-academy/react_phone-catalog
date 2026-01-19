import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Breadcrumbs.module.scss';
import { buildBreadcrumbs } from './buildBreadcrumbs';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const breadcrumbs = buildBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.breadcrumb}>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          const content = crumb.icon ? (
            <span className={`icon icon--${crumb.icon}`} />
          ) : (
            <span className={styles.breadcrumb__text}>{t(crumb.label)}</span>
          );

          return (
            <li
              key={`${crumb.link}-${index}`}
              className={styles.breadcrumb__item}
              aria-current={isLast ? 'page' : undefined}
            >
              {isLast ? content : <Link to={crumb.link!}>{content}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
