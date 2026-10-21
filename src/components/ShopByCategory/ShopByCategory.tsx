import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { CATEGORIES } from '../../utils/categories';
import styles from './ShopByCategory.module.scss';

type Props = {
  products: Product[];
};

export const ShopByCategory = ({ products }: Props) => (
  <div className={styles.category} data-cy="categoryLinks">
    <h2 className={styles.category__title}>Shop by category</h2>
    <div className={styles.category__list}>
      {CATEGORIES.map(({ name, title, image }) => (
        <Link key={name} to={`/${name}`} className={styles.category__card}>
          <div className={styles['category__image-container']}>
            <img src={image} alt={title} className={styles.category__image} />
          </div>
          <h3 className={styles.category__name}>{title}</h3>
          <p className={styles.category__count}>
            {products.filter(p => p.category === name).length} models
          </p>
        </Link>
      ))}
    </div>
  </div>
);
