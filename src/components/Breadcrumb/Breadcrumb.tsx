import { Link, useLocation } from 'react-router-dom';
import { IconNavLink } from '../IconNavLink';
import { Icon } from '../Icon';
import { useTranslate } from '../../hooks/useTranslate';
import { slugToTitle } from '../../utils/slugToTitle';
import styles from './Breadcrumb.module.scss';

export const Breadcrumb = () => {
  const location = useLocation();
  const t = useTranslate();

  const pathnames = location.pathname.split('/').filter(Boolean);

  let accumulatedPath = '';

  const breadcrumbItems = pathnames.map((slug, index) => {
    const isLast = index === pathnames.length - 1;

    accumulatedPath += `/${slug}`;

    return { slug, path: accumulatedPath, isLast };
  });

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ul className={styles.list}>
        <li className={styles.item}>
          <IconNavLink
            to="/"
            iconName={'home'}
            className={styles.homeIcon}
            ariaLabel="Home"
          />
        </li>

        {breadcrumbItems.map(({ slug, path, isLast }) => {
          const title =
            t(`categories.${slug}`) !== `categories.${slug}`
              ? t(`categories.${slug}`)
              : slugToTitle(slug);

          return (
            <li key={path} className={styles.item}>
              <div className={styles.arrowIcon} aria-hidden="true">
                <Icon name="arrowRight" />
              </div>

              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {title}
                </span>
              ) : (
                <Link to={path} className={styles.link}>
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
