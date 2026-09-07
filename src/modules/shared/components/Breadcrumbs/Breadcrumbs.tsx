import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '../Icon/Icon';
import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  key: string;
  match: {
    pathname: string;
    params?: Record<string, string | undefined>;
  };
  breadcrumb: React.ReactNode;
  location: {
    pathname: string;
  };
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick?: (pathname: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbs,
  onBreadcrumbClick,
}) => {
  const { t } = useTranslation();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  const handleClick = (pathname: string, event: React.MouseEvent) => {
    if (onBreadcrumbClick) {
      event.preventDefault();
      onBreadcrumbClick(pathname);
    }
  };

  return (
    <nav
      className={styles.breadcrumbs}
      aria-label={t('breadcrumbs.navigation')}
    >
      <ol className={styles.breadcrumbs__list}>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={breadcrumb.key} className={styles.breadcrumbs__item}>
              {!isLast ? (
                <>
                  <Link
                    to={breadcrumb.match.pathname}
                    className={styles.breadcrumbs__link}
                    onClick={e => handleClick(breadcrumb.match.pathname, e)}
                  >
                    {breadcrumb.breadcrumb}
                  </Link>
                  <Icon
                    name="arrow-right"
                    size={12}
                    className={styles.breadcrumbs__separator}
                  />
                </>
              ) : (
                <span className={styles.breadcrumbs__current}>
                  {breadcrumb.breadcrumb}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
