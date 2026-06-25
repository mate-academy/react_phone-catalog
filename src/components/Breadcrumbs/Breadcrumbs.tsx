import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

const IconHome = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 6.5L8 2l6 4.5V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M6 15v-5h4v5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const IconChevron = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6 12l4-4-4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface Crumb {
  label: string;
  path?: string;
}

interface Props {
  crumbs: Crumb[];
}

export const Breadcrumbs: React.FC<Props> = ({ crumbs }) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
    <Link to="/" className={styles.home} aria-label="Home">
      <IconHome />
    </Link>

    {crumbs.map((crumb, i) => (
      <React.Fragment key={i}>
        <span className={styles.separator} aria-hidden="true">
          <IconChevron />
        </span>

        {crumb.path ? (
          <Link to={crumb.path} className={styles.link}>
            {crumb.label}
          </Link>
        ) : (
          <span className={styles.current} aria-current="page">
            {crumb.label}
          </span>
        )}
      </React.Fragment>
    ))}
  </nav>
);
