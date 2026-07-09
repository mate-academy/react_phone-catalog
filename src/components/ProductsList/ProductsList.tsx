import { useFilters } from '../../hooks/useFilters';
import { ProductPreview } from '../../types';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: ProductPreview[];
  error?: string | null;
  loading?: boolean;
  category: string | undefined;
};

export const ProductsList: React.FC<Props> = ({
  products,
  error,
  loading,
  category,
}) => {
  const { query } = useFilters();

  return (
    <ul className={styles.list}>
      {loading && <Loader />}

      {error && <p className="has-text-danger">Something went wrong</p>}

      {!products.length && !loading && !query && (
        <p>There are no {category} yet</p>
      )}

      {!products.length && !loading && query && (
        <p>There are no {category} matching the query</p>
      )}

      {products.map(product => (
        <li key={product.id} className={styles.list__item}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
