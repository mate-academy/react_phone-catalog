import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './PageHeader.module.scss';
import { ArrowIcon } from '@/shared/ui/Icons/ArrowIcon';
import { IconHome } from '@/shared/ui/Icons/IconHome';

type BreadCrumbsProps = {
  title?: string;
};

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ title }) => {
  const { category, productSlug } = useParams();

  const formatCategory = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className={styles.breadcrumbs}>
      <div className={styles.breadcrumbsList}>
        <Link to="/" className={styles.link} aria-label="Home">
          <IconHome className={styles.icon} />
        </Link>

        {category && (
          <div className={styles.item}>
            <ArrowIcon direction="right" className={styles.chevron} />
            {productSlug ? (
              <Link to={`/${category}`} className={styles.link}>
                {formatCategory(category)}
              </Link>
            ) : (
              <span className={styles.current}>{formatCategory(category)}</span>
            )}
          </div>
        )}

        {productSlug && title && (
          <div className={styles.item}>
            <ArrowIcon direction="right" className={styles.chevron} />
            <span className={styles.current}>{title}</span>
          </div>
        )}
        {!category && title && (
          <div className={styles.item}>
            <ArrowIcon direction="right" className={styles.chevron} />
            <span className={styles.current}>{title}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BreadCrumbs;
