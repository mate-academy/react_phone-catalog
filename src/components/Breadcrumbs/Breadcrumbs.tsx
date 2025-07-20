import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import HomeIcon from '/icons/home.svg';
import ArrowRightIcon from '/icons/arrow_right.svg';
import styles from './Breadcrumbs.module.scss';
import clsx from 'clsx';

interface PathMapping {
  [key: string]: string;
}

const PATH_MAPPING: PathMapping = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  products: 'Products',
  favourites: 'Favourites',
  cart: 'Cart',
};

interface BreadcrumbsProps {
  lastItemNameOverride?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  lastItemNameOverride,
}) => {
  const location = useLocation();
  const pathsegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems: { name: string; path: string; isCurrent: boolean }[] =
    [];

  breadcrumbItems.push({
    name: 'Home',
    path: '/',
    isCurrent: pathsegments.length === 0,
  });

  let currentPath = '';
  pathsegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLastSegment = index === pathsegments.length - 1;

    let displayName = '';

    if (isLastSegment && lastItemNameOverride) {
      displayName = lastItemNameOverride;
    } else {
      displayName = PATH_MAPPING[segment];
      if (!displayName) {
        displayName = segment;
      }
    }

    breadcrumbItems.push({
      name: displayName,
      path: currentPath,
      isCurrent: isLastSegment,
    });
  });

  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.breadcrumbList}>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.path}>
            {index > 0 && (
              <li className={styles.breadcrumbSeparator}>
                <img
                  src={ArrowRightIcon}
                  alt="Separator"
                  className={styles.arrowIcon}
                />
              </li>
            )}
            <li className={styles.breadcrumbItem}>
              {item.isCurrent ?
                <span className={styles.currentBreadcrumb}>{item.name}</span>
              : <NavLink
                  to={item.path}
                  className={styles.breadcrumbLink}
                >
                  {index === 0 ?
                    <img
                      src={HomeIcon}
                      alt="Home"
                      className={clsx(styles.homeIcon, 'app-icon')}
                    />
                  : item.name}
                </NavLink>
              }
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
