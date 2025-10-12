import styles from './HomeCatalog.module.scss';
import { Product } from '../../../types/product';
import ProductCard from '../../shared/ProductCard';

interface Props {
  title: string;
  products: Product[];
}

const HomeCatalog: React.FC<Props> = ({ title, products }) => {
  return (
    <div>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button>left</button>
          <button>right</button>
        </div>
      </div>
      <div className={styles.slider}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeCatalog;
