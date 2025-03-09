import { Link, useLocation } from 'react-router-dom';
import { PATH_OPTIONS } from '../../utils/constants';
import styles from './Breadcrumbs.module.scss';
import React from 'react';
import classNames from 'classnames';
import { ItemCard } from '../../types/ItemCard';

type BreadcrumbsProps = {
  filteredProduct?: ItemCard | null;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  filteredProduct,
}) => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/');

  const currentPath = PATH_OPTIONS.find(
    option => option.label === `/${pathSegments[1]}`,
  );

  const renderBreadcrumbLink = () => (
    <Link
      to={currentPath?.label ?? '/'}
      className={classNames(styles.breadcrumbs__path, {
        [styles['breadcrumbs__path--disabled']]: !filteredProduct,
      })}
    >
      {currentPath?.value}
    </Link>
  );

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__path}>
        <img src="/icons/home.svg" alt="Home icon" />
      </Link>

      {currentPath && (
        <>
          <img
            src="/icons/chevron-arrow-right-disabled.svg"
            alt="Right arrow icon"
          />
          {renderBreadcrumbLink()}
        </>
      )}

      {filteredProduct && (
        <>
          <img
            src="/icons/chevron-arrow-right-disabled.svg"
            alt="Right arrow icon"
          />
          <span
            className={classNames(
              styles.breadcrumbs__path,
              styles['breadcrumbs__path--disabled'],
            )}
          >
            {filteredProduct.name}
          </span>
        </>
      )}
    </div>
  );
};
