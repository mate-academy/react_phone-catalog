import { Link, UIMatch, useMatches } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { CrumbHandle } from '../../../../router';

export const Breadcrumbs = () => {
  const matches = useMatches() as UIMatch<unknown, CrumbHandle<unknown>>[];
  const crumbs = matches.filter(match => match.handle?.crumb);

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.crumbLink} aria-label="Home">
            <img src="/img/icons/home.svg" alt="" className={styles.homeIcon} />
          </Link>
        </li>

        {crumbs.map((match, index) => {
          const { handle, pathname, params, data } = match;
          const breadcrumbHandle = handle as CrumbHandle<unknown>;

          const isLast = index === crumbs.length - 1;

          const title =
            typeof breadcrumbHandle.crumb === 'function'
              ? breadcrumbHandle.crumb(params, data)
              : breadcrumbHandle.crumb;

          if (!title) {
            return null;
          }

          return (
            <li key={pathname} className={styles.item}>
              {isLast ? (
                <span className={styles.currentCrumb} aria-current="page">
                  {title}
                </span>
              ) : (
                <>
                  <Link to={pathname} className={styles.crumbLink}>
                    {title}
                  </Link>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
