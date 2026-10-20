import { Link } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

type Props = {
  category: string;
  productName: string;
};

export const Breadcrumbs = ({ category, productName }: Props) => {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to="/" className={styles.link}>
        Home
      </Link>

      <span className={styles.separator}>/</span>

      <Link to={`/${category}`} className={styles.link}>
        {categoryName}
      </Link>

      <span className={styles.separator}>/</span>

      <span className={styles.current} aria-current="page">
        {productName}
      </span>
    </nav>
  );
};
