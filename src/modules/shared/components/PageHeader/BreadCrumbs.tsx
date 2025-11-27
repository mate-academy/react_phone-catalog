import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './PageHeader.module.scss';

// 1. Extract Icons to clean up the main logic
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.59.807a.67.67 0 0 1 .82 0l6 4.667c.162.126.257.32.257.526v7.333a2 2 0 0 1-2 2H3.333a2 2 0 0 1-2-2V6c0-.206.095-.4.258-.526zm-4.923 5.52v7.006a.667.667 0 0 0 .666.667h9.334a.666.666 0 0 0 .666-.667V6.326L8 2.178z"
      fill="#313237"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.333 8c0-.368.299-.667.667-.667h4c.368 0 .667.299.667.667v6.667a.667.667 0 0 1-1.334 0v-6H6.667v6a.667.667 0 0 1-1.334 0z"
      fill="#313237"
    />
  </svg>
);

const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={styles.separator}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.53 3.529c.26-.26.682-.26.942 0l4 4c.26.26.26.682 0 .942l-4 4a.667.667 0 1 1-.943-.942L9.058 8 5.529 4.471a.667.667 0 0 1 0-.942"
      fill="#b4bdc4"
    />
  </svg>
);

type BreadCrumbsProps = {
  title?: string;
};

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ title }) => {
  const { category, productSlug } = useParams();

  // 2. Format logic outside JSX
  const formatCategory = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {/* 3. Use an Ordered List for semantics */}
      <ol className={styles.breadcrumbsList}>
        {/* Home Link */}
        <li className={styles.item}>
          <Link to="/" className={styles.link} aria-label="Home">
            <HomeIcon />
          </Link>
        </li>

        {/* Category Link */}
        {category && (
          <li className={styles.item}>
            <ChevronIcon />
            <Link to={`/${category}`} className={styles.link}>
              {formatCategory(category)}
            </Link>
          </li>
        )}

        {/* Product Page (Current Page) */}
        {productSlug && title && (
          <li className={styles.item}>
            <ChevronIcon />
            {/* aria-current tells screen readers this is the active page */}
            <span className={styles.current} aria-current="page">
              {title}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
