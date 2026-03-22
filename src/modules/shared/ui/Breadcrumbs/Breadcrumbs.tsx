import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import HomeIcon from '@/assets/icons/Home.svg?react';
import ArrowRight from '@/assets/icons/ArrowRight.svg?react';
import { useTranslation } from 'react-i18next';

interface Props {
  category?: string;
  productName?: string;
  pageName?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ category, productName, pageName }) => {
  const { t } = useTranslation();

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link
            to="/"
            className={styles.breadcrumbs__link}
            aria-label={t('nav.home')}
          >
            <HomeIcon className={styles.breadcrumbs__icon} />
          </Link>
        </li>

        {pageName && (
          <>
            <li className={styles.breadcrumbs__separator}>
              <ArrowRight className={styles.breadcrumbs__icon} />
            </li>
            <li className={styles.breadcrumbs__item}>
              <span className={styles.current}>{pageName}</span>
            </li>
          </>
        )}

        {category && (
          <>
            <li className={styles.breadcrumbs__separator}>
              <ArrowRight className={styles.breadcrumbs__icon} />
            </li>
            <li className={styles.breadcrumbs__item}>
              <Link
                to={`/${category.toLowerCase()}`}
                className={styles.breadcrumbs__link}
              >
                {t(`nav.${category.toLowerCase()}`)}
              </Link>
            </li>
          </>
        )}

        {productName && (
          <>
            <li className={styles.breadcrumbs__separator}>
              <ArrowRight className={styles.breadcrumbs__icon} />
            </li>
            <li className={styles.breadcrumbs__item}>
              <span className={styles.breadcrumbs__current}>{productName}</span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
