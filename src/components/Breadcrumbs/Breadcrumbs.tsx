import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, useNavigate } from 'react-router-dom';

export interface Breadcrumb {
  name: string;
  path?: string;
  icon?: React.ReactNode;
}

interface Props {
  breadcrumbs?: Breadcrumb[];
  showBreadcrumbs?: boolean;
  backButton?: boolean;
  title?: string;
  subtitle?: string;
}

export const Breadcrumbs: React.FC<Props> = ({
  breadcrumbs,
  showBreadcrumbs = false,
  backButton = false,
  title,
  subtitle,
}) => {
  const navigateBack = useNavigate();

  return (
    <section className={styles.breadcrumbs}>
      {showBreadcrumbs && (
        <nav className={styles.breadcrumbs__nav} aria-label="Breadcrumb">
          <Link
            to="/"
            className={styles.breadcrumbs__homeLink}
            aria-label="Home"
          >
            <img src="./icons/home.svg" alt="home" />
          </Link>
          {breadcrumbs?.map(bc => (
            <React.Fragment key={bc.name}>
              <img
                src="./icons/Chevron (Arrow Right).svg"
                alt="next"
                className={styles.breadcrumbs__iconNext}
              />
              <div className={styles.breadcrumbs__breadcrumbItem}>
                {bc.path ? (
                  <Link
                    to={bc.path}
                    className={styles.breadcrumbs__breadcrumbLink}
                  >
                    {bc.name}
                  </Link>
                ) : (
                  <span className={styles.breadcrumbs__breadcrumbCurrent}>
                    {bc.name}
                  </span>
                )}
              </div>
            </React.Fragment>
          ))}
        </nav>
      )}
      {backButton && (
        <button
          type="button"
          className={styles.breadcrumbs__backButton}
          onClick={() => navigateBack(-1)}
          aria-label="Back"
        >
          <img
            src="./icons/Chevron (Arrow Left).svg"
            alt="Back"
            className={styles.breadcrumbs__backButtonIcon}
          />
          Back
        </button>
      )}
      <div className={styles.breadcrumbs__titleBlock}>
        <h1 className={styles.breadcrumbs__title}>{title}</h1>
        {subtitle && (
          <div className={styles.breadcrumbs__subtitle}>{subtitle}</div>
        )}
      </div>
    </section>
  );
};
