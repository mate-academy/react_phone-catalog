import styles from './HomeCatalog.module.scss';
import { Product } from '../../../types/Product';
import ProductCard from '../../shared/ProductCard';

interface Props {
  title: string;
  products: Product[];
}

const HomeCatalog: React.FC<Props> = ({ title, products }) => {
  return (
    <div>
      <div className={styles.catalog__top}>
        <h2 className={styles.catalog__title}>{title}</h2>
        <div className={styles.catalog__buttons}>
          <button>left</button>
          <button>right</button>
        </div>
      </div>
      <div className={styles.catalog__slider}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeCatalog;
