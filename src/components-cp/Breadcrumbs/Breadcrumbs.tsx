import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import ArrowIcon from '../../assets/icons/arrow.svg';
import { useTranslation } from 'react-i18next';

import HomeIconDark from '../../assets/icons/logo-home-black.svg';
import HomeIconLight from '../../assets/icons/logo-home.svg';

interface BreadcrumbsProps {
  currentPage?: string;
  currentPageLink?: string;
  extra?: string;
  theme: 'light' | 'dark';
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  currentPageLink,
  extra,
  theme,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.breadcrumbWrapper}>
      <div className={styles.breadcrumb}>
        <NavLink to="/">
          <img
            src={theme === 'light' ? HomeIconLight : HomeIconDark}
            alt={t('nav.home') || 'Home'}
          />
        </NavLink>

        {currentPage && (
          <>
            <img src={ArrowIcon} alt="Arrow" className={styles.arrow} />
            <NavLink
              to={currentPageLink || '#'}
              className={`${styles.currentPage} ${
                extra ? styles.withExtra : ''
              } ${!extra && !currentPageLink ? styles.gray : ''}`}
            >
              {t(`nav.${currentPage}`)}
            </NavLink>
          </>
        )}

        {extra && (
          <>
            <img src={ArrowIcon} alt="Arrow" className={styles.arrow} />
            <div className={styles.extraWrapper}>
              <span className={styles.extra} title={extra}>
                {extra}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
