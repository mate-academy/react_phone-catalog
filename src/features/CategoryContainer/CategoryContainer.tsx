import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { Product } from '../../shared/types/Product';
import { useSortedProducts } from '../../shared/utils/hooks/useSortedProducts';
import { ProductList } from '../ProductList';
import styles from './CategoryContainer.module.scss';

type Props = {
  filteredProducts: Product[];
  title: string;
  isError?: boolean;
};

export const CategoryContainer: React.FC<Props> = ({
  filteredProducts,
  title,
  isError,
}) => {
  const { sortedProducts } = useSortedProducts(filteredProducts);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main className={styles.category}>
      <div className="page-container">
        <div className={styles.category__top}>
          <Breadcrumbs classStyles={styles.category__breads} />
          <h1 className={styles.category__title}>{title}</h1>
          <p>{sortedProducts.length} models</p>
        </div>

        {isError && (
          <div className={styles.reload}>
            <h3>Something go wrong</h3>
            <button onClick={handleReload}>Reload</button>
          </div>
        )}
        {!isError && <ProductList goods={sortedProducts} />}
      </div>
    </main>
  );
};
