import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

import products from 'data/api/products.json';
import HomeIcon from '@/assets/icons/Home.svg?react';
import ArrowRight from '@/assets/icons/ArrowRight.svg?react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  classNameCustom?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ classNameCustom }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const { itemId: routeItemId } = useParams<{ itemId?: string }>();

  const i18nCategoryKeys: { [key: string]: string } = {
    phones: 'productCatalog.titlePhones',
    tablets: 'productCatalog.titleTablets',
    accessories: 'productCatalog.titleAccessories',
    favourites: 'productCatalog.titleFavourites',
  };

  const getProductName = (category: string, itemId: string) => {
    const product = products.find(
      p => p.category === category && p.itemId === itemId,
    );

    return product ? product.name : itemId;
  };

  return (
    <nav className={cn(styles.breadcrumbs, classNameCustom)}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/">
            <HomeIcon className={styles.homeIcon} />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          let displayName = value;

          if (isLast && routeItemId && pathnames.length > 1) {
            const category = pathnames[pathnames.length - 2];
            const fallbackName = getProductName(category, routeItemId);

            displayName = t(`products.${routeItemId}.name`, fallbackName);
          } else {
            const i18nKey = i18nCategoryKeys[value];

            if (i18nKey) {
              displayName = t(i18nKey);
            }
          }

          return (
            <React.Fragment key={to}>
              {index >= 0 && <ArrowRight className={styles.arrowIcon} />}
              <li className={styles.item}>
                <div className={styles.breadcrumbStep}>
                  {isLast ? (
                    <span className={styles.current}>{displayName}</span>
                  ) : (
                    <Link className={styles.prev} to={to}>
                      {displayName}
                    </Link>
                  )}
                </div>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};
