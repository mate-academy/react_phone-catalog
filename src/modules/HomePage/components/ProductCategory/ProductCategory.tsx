import { Product } from 'modules/shared/types/Product';
import styles from './ProductCategory.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  products: Product[];
  image: string;
  title: string;
  link: string;
};

export const ProductCategory: React.FC<Props> = ({
  products,
  image,
  title,
  link,
}) => {
  return (
    <Link className={styles.link} to={link}>
      <div className={styles.categoryContainer}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={image} alt={title} />
        </div>
        <div className={styles.categoryInfo}>
          <span className={styles.categoryName}>{title}</span>
          <span className={styles.categoryAmount}>
            ${products.length} models
          </span>
        </div>
      </div>
    </Link>
  );
};
