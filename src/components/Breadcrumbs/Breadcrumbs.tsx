import React, { Fragment, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

type BreadcrumbsType = {
  label: string;
  path: string;
};

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const breadcrumbs = useMemo<BreadcrumbsType[]>(() => {
    const segments = pathname.match(/[^/]+/g) || [];

    return segments.map((segment, index) => ({
      label: segment,
      path: `/${segments.slice(0, index + 1).join('/')}`,
    }));
  }, [pathname]);

  return (
    <nav className={styles.breadcrumbs}>
      <Link className={styles.breadcrumbsLink} to="/">
        <Icon type="home"> </Icon>
      </Link>
      {breadcrumbs.map((segment, index) => (
        <Fragment key={index}>
          <Icon type="arrowRight"></Icon>
          <Link
            className={classNames(styles.breadcrumbsLink, {
              [styles.breadcrumbsLinkLast]: index === breadcrumbs.length - 1,
            })}
            to={segment.path || '/'}
          >
            {t(`navigation.${segment.label}`, '') ||
              segment.label.slice(0, 1).toUpperCase() + segment.label.slice(1, -1)}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
};
