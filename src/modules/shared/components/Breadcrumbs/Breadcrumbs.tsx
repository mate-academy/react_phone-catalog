import { Link, UIMatch, useMatches } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { CrumbHandle } from '../../../../router';
import { useTheme } from '../../../../contexts/ThemeContext';

export const Breadcrumbs = () => {
  const { theme } = useTheme();
  const homeDark = './img/icons/home.svg';
  const homeLight = './img/icons/home-light.svg';

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
            <img
              src={theme === 'dark' ? homeDark : homeLight}
              alt=""
              className={styles.homeIcon}
            />
          </Link>
        </li>

        {crumbs.map((match, index) => {
          const { handle, pathname, params, data } = match;
          const breadcrumbHandle = handle as CrumbHandle<unknown>;

          const isLast = index === crumbs.length - 1;

          const title = breadcrumbHandle.crumb(params, data);

          if (!title) {
            return null;
          }

          const targetPath =
            typeof breadcrumbHandle.linkTo === 'function'
              ? breadcrumbHandle.linkTo(params)
              : breadcrumbHandle.linkTo || pathname;

          return (
            <li key={`${pathname}-${index}`} className={styles.item}>
              {isLast ? (
                <span className={styles.currentCrumb} aria-current="page">
                  {title}
                </span>
              ) : (
                <>
                  <Link to={targetPath} className={styles.crumbLink}>
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
