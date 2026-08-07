import React, { Fragment } from 'react';
import styles from './PageHeader.module.scss';
import { Typography } from '../Typography';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@public/img/icons/icon-home.svg?react';
import ArrowIcon from '@public/img/icons/icon-arrow.svg?react';
import { useTranslation } from 'react-i18next';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  subtitle?: string;
  showBack?: boolean;
};

export const PageHeader: React.FC<Props> = ({
  title,
  breadcrumbs,
  subtitle,
  showBack,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.pageHeader}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className={styles.pageHeaderNav}>
          <Link to={'/'} className={styles.pageHeaderHomeLink}>
            <HomeIcon className={styles.pageHeaderIcon} />
          </Link>

          {breadcrumbs.map((item, index) => (
            <Fragment key={index}>
              <ArrowIcon className={styles.pageHeaderArrowIcon} />

              {item.href ? (
                <Link to={item.href} className={styles.pageHeaderLink}>
                  {item.label}
                </Link>
              ) : (
                <div className={styles.pageHeaderName}>{item.label}</div>
              )}
            </Fragment>
          ))}
        </div>
      )}

      {showBack && (
        <button
          className={styles.pageHeaderBackLink}
          onClick={() => navigate(-1)}
        >
          <ArrowIcon className={styles.pageHeaderIconBack} />
          {t('back.back')}
        </button>
      )}

      <Typography variant="h2" className={styles.pageHeaderTitle}>
        {title}
      </Typography>

      {subtitle && <p className={styles.pageHeaderSubtitle}>{subtitle}</p>}
    </div>
  );
};
