import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  category: string;
  productName?: string;
}

export const Breadcrumbs = ({ category, productName }: Props) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeButton} />
      <img src="./img/icons/arrow_nav.png" />

      {productName ? (
        <Link to={`/${category.toLowerCase()}`} className={styles.categoryLink}>
          {category}
        </Link>
      ) : (
        <p className={styles.currentPage}>{category}</p>
      )}

      {productName && (
        <>
          <img src="./img/icons/arrow_nav.png" />
          <p className={styles.currentPage}>{productName}</p>
        </>
      )}
    </div>
  );
};
