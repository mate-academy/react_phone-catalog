import { useProductsContext } from 'contexts/ProductsContext';
import { ProductCategory } from '../ProductCategory';
import styles from './ProductsCategory.module.scss';

export const ProductsCategory = () => {
  const { data, loading } = useProductsContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.productContainer}>
        <ProductCategory products={data.phones || []} />
        <ProductCategory products={data.tablets || []} />
        <ProductCategory products={data.accessories || []} />
      </div>
    </div>
  );
};
