import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import HomeIcon from '../../assets/icons/logo-home.svg';
import ArrowIcon from '../../assets/icons/arrow.svg';
import { useTranslation } from 'react-i18next';

interface BreadcrumbsProps {
  currentPage?: string;
  currentPageLink?: string;
  extra?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  currentPageLink,
  extra,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.breadcrumbWrapper}>
      <div className={styles.breadcrumb}>
        <NavLink to="/">
          <img src={HomeIcon} alt={t(`nav.${currentPage}`)} />
        </NavLink>

        {currentPage && (
          <>
            <img src={ArrowIcon} alt="Arrow" className={styles.arrow} />
            <NavLink
              to={currentPageLink || '#'}
              className={`${styles.currentPage} ${extra ? styles.withExtra : ''} ${!extra && !currentPageLink ? styles.gray : ''}`}
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
