import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { getArrowRightDisabledIcon, getHomeIcon } from '../../utils/getIcons';
import styles from './Breadcrumbs.module.scss';

type Props = {
  productDetails?: {
    category: string;
    name: string;
  };
};

export const Breadcrumbs: React.FC<Props> = ({ productDetails }) => {
  const { theme } = useTheme();
  const homeIcon = getHomeIcon(theme);
  const arrowLeftIcon = getArrowRightDisabledIcon(theme);

  const { pathname } = useLocation();

  const capitaliseFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const getBreadcrumbs = () => {
    if (productDetails) {
      return [
        {
          path: `/${productDetails.category}`,
          label: capitaliseFirstLetter(productDetails.category),
        },
        { label: productDetails.name },
      ];
    } else {
      const pathnames = pathname.split('/').filter(Boolean);

      return pathnames.map((path, index, array) => ({
        path: `/${array.slice(0, index + 1).join('/')}`,
        label: capitaliseFirstLetter(path),
      }));
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className={styles.container}>
      <Link to="/">
        <img src={homeIcon} alt="home" />
      </Link>

      <span>
        <img src={arrowLeftIcon} alt="arrow" />
      </span>

      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {breadcrumb.path ? (
            <Link
              to={breadcrumb.path}
              className={classNames(styles.categoryTitle, {
                [styles.active]: pathname !== breadcrumb.path,
              })}
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <span className={styles.productTitle}>{breadcrumb.label}</span>
          )}
          {index < breadcrumbs.length - 1 && (
            <span>
              <img src={arrowLeftIcon} alt="arrow" />
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
