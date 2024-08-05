import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import { Category } from '../../types/Category';
import { BreadcrumbsT } from '../../types/Breadcrumbs';
import styles from './Breadcrumbs.module.scss';
import iconStyles from '../../styles/icons.module.scss';

type Props = {
  name?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const paths = location.pathname.split('/');

  paths.shift();

  const BREADCRUMBS = {
    [BreadcrumbsT.PHONES]: t(TRANSLATIONS.category.card.phones.title.text),
    [BreadcrumbsT.TABLETS]: t(TRANSLATIONS.category.card.tablets.title.text),
    [BreadcrumbsT.ACCESSORIES]: t(
      TRANSLATIONS.category.card.accessories.title.text,
    ),
    [BreadcrumbsT.FAVOURITES]: t(TRANSLATIONS.favourites.title),
    [BreadcrumbsT.CART]: t(TRANSLATIONS.cart.title),
  };

  return (
    <div className={styles.block}>
      <Link
        to="/"
        title={t(TRANSLATIONS.breadcrumbs.home.title)}
        aria-label={t(TRANSLATIONS.breadcrumbs.home.ariaLabel)}
      >
        <span className={`${iconStyles.block} ${iconStyles.home}`}></span>
      </Link>

      {paths.map((path, index) => {
        const nameFromPath = path.replaceAll('-', ' ');

        if (index === paths.length - 1) {
          return (
            <React.Fragment key={index}>
              <span
                className={`${iconStyles.block} ${iconStyles.arrowRight} ${iconStyles.colorBase}`}
              ></span>
              <p className={styles.text}>
                {name || BREADCRUMBS[nameFromPath as BreadcrumbsT]}
              </p>
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            <span
              className={`${iconStyles.block} ${iconStyles.arrowRight} ${iconStyles.colorBase}`}
            ></span>
            <Link
              to={`/${path}`}
              className={`${styles.text} ${styles.text_m_link}`}
              aria-label={t(TRANSLATIONS.breadcrumbs.link.ariaLabel, {
                pageName: BREADCRUMBS[nameFromPath as Category],
              })}
            >
              {BREADCRUMBS[nameFromPath as Category]}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};
