import { Link } from 'react-router-dom';
import { BreadcrumbItem } from '../../types/BreadcrumbItem';
import styles from './BreadCrumbs.module.scss';
import React from 'react';

type Props = {
  elements: BreadcrumbItem[];
};
export const BreadCrumbs: React.FC<Props> = ({ elements }) => (
  <div className={styles.container}>
    {elements.map((el, i) => {
      const isLast = i === elements.length - 1;

      return (
        <React.Fragment key={el.label}>
          {el.path ? (
            <Link to={el.path} className={styles.breadcrumbLink}>
              {el.label === 'Home' ? (
                <img
                  className={styles.homeIcon}
                  src="img/icons/icon-home.svg"
                  alt="Icon home"
                />
              ) : (
                el.label
              )}
            </Link>
          ) : (
            <span className={styles.currentPage}>{el.label}</span>
          )}
          {!isLast && (
            <span className={styles.separator}>
              <img src="img/icons/icon-right-gray.svg" alt="Arrow right" />
            </span>
          )}
        </React.Fragment>
      );
    })}
  </div>
);
