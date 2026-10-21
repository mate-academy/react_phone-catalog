import React from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/assets';
import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<Props> = ({ items }) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
    <Link to="/" className={styles.home}>
      <img src={getAssetUrl('img/icons/home.svg')} alt="Home" />
    </Link>

    {items.map(item => (
      <React.Fragment key={`${item.to ?? ''}-${item.label}`}>
        <span className={styles.separator} aria-hidden="true">
          ›
        </span>
        {item.to ? (
          <Link to={item.to} className={styles.link}>
            {item.label}
          </Link>
        ) : (
          <span className={styles.current}>{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);
