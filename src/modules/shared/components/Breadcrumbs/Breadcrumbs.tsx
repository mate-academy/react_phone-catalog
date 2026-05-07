import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../../../../constants';
import styles from './Breadcrumbs.module.scss';

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type Props = {
  links: BreadcrumbItem[];
};

export const Breadcrumbs: React.FC<Props> = ({ links }) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to="/" className={styles.breadcrumbLink}>
        <img src={ICONS.HOME} alt="Home" className={styles.homeIcon} />
      </Link>

      {links.map((item, index) => {
        const isLast = index === links.length - 1;

        return (
          <React.Fragment key={index}>
            <img
              src={ICONS.ARROW_BREADCRUMB}
              alt=""
              className={styles.breadcrumbArrow}
            />

            {isLast || !item.to ? (
              <span className={styles.breadcrumbCurrent}>{item.label}</span>
            ) : (
              <Link to={item.to} className={styles.breadcrumbLink}>
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
