import { Link, UIMatch, useMatches } from 'react-router-dom';
import { BreadcrumbHandle } from '../../../../types/breadcrumbHandle';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const matches = useMatches() as UIMatch<unknown, BreadcrumbHandle>[];

  const crumbs = matches.filter(
    match =>
      match.handle &&
      typeof (match.handle as BreadcrumbHandle).crumb !== 'undefined',
  );

  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {crumbs.map((match, index) => {
          const { handle, id, pathname, data } = match;
          const breadcrumbHandle = handle as BreadcrumbHandle;

          const isLast = index === crumbs.length - 1;

          const title =
            typeof breadcrumbHandle.crumb === 'function'
              ? breadcrumbHandle.crumb(data)
              : breadcrumbHandle.crumb;

          return (
            <li key={`${id}-${index}`} className={styles.item}>
              {isLast ? (
                <span className={styles.currentCrumb}>{title}</span>
              ) : (
                <>
                  <Link to={pathname} className={styles.crumbLink}>
                    {title}
                  </Link>
                  <span className={styles.separator}>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
