import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import products from 'data/api/products.json';
import HomeIcon from '@/assets/icons/Home.svg?react';
import ArrowRight from '@/assets/icons/ArrowRight.svg?react';
import cn from 'classnames';

type Props = {
  classNameCustom?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ classNameCustom }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const { itemId } = useParams<{ itemId?: string }>();

  const categoryNames: { [key: string]: string } = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    favourites: 'Favourites',
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
          let displayName = categoryNames[value] || value;

          if (isLast && pathnames.length === 2 && itemId) {
            const category = pathnames[0];

            displayName = getProductName(category, itemId);
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
