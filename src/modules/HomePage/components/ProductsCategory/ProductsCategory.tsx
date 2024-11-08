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
      <div className={styles.productsContainer}>
        <ProductCategory
          products={data.phones || []}
          image="img/category-phones.png"
          title="Mobile phones"
          link="/phones"
        />
        <ProductCategory
          products={data.tablets || []}
          image="img/category-tablets.png"
          title="Tablets"
          link="/tablets"
        />
        <ProductCategory
          products={data.accessories || []}
          image="img/category-accessories.png"
          title="Accessories"
          link="/accessories"
        />
      </div>
    </div>
  );
};
