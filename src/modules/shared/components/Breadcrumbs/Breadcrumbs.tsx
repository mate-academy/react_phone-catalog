import { Link } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

type Props = {
  category: string;
  productName?: string;
};

export const Breadcrumbs = ({ category, productName }: Props) => {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to="/" className={styles.homeLink} aria-label="Home">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m3 10 9-7 9 7v11H3V10Z" />
          <path d="M9 21v-9h6v9" />
        </svg>
      </Link>

      <span className={styles.separator} aria-hidden="true">
        ›
      </span>

      {productName ? (
        <>
          <Link to={`/${category}`} className={styles.link}>
            {categoryName}
          </Link>

          <span className={styles.separator} aria-hidden="true">
            ›
          </span>

          <span className={styles.current} aria-current="page">
            {productName}
          </span>
        </>
      ) : (
        <span className={styles.current} aria-current="page">
          {categoryName}
        </span>
      )}
    </nav>
  );
};
