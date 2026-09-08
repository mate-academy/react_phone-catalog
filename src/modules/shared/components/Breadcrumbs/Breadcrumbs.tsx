import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { icons } from '../../constants/icons';
import { Icon } from '../Icon/Icon';

type Props = {
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ productName }) => {
  const location = useLocation();
  const listOfPaths = location.pathname.split('/').filter(item => item);

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__link}>
        <Icon icon={icons.home} />
      </Link>

      {listOfPaths.map((name, index) => {
        const fullRoute = `/${listOfPaths.slice(0, index + 1).join('/')}`;
        const isLast = index === listOfPaths.length - 1;

        return (
          <React.Fragment key={fullRoute}>
            <span>
              <Icon icon={icons.arrow_right} />
            </span>

            {isLast && productName ? (
              <span className={styles.breadcrumbs__text}>{productName}</span>
            ) : isLast ? (
              <span className={styles.breadcrumbs__text}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            ) : (
              <Link to={fullRoute} className={styles.breadcrumbs__link}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
