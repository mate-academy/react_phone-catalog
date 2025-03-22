import { useProductsContext } from 'contexts/ProductsContext';

import { ProductCategory } from '../ProductCategory';

import styles from './ProductsCategory.module.scss';

export const ProductsCategory: React.FC = () => {
  const { productsByCategory, loading } = useProductsContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.productsContainer}>
        <ProductCategory
          products={productsByCategory.phones || []}
          image="img/category-phones.png"
          title="Mobile phones"
          link="/phones"
        />
        <ProductCategory
          products={productsByCategory.tablets || []}
          image="img/category-tablets.png"
          title="Tablets"
          link="/tablets"
        />
        <ProductCategory
          products={productsByCategory.accessories || []}
          image="img/category-accessories.png"
          title="Accessories"
          link="/accessories"
        />
      </div>
    </div>
  );
};
