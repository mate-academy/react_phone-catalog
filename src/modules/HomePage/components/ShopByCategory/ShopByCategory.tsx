import { CategoryCard } from '../CategoryCard/CategoryCard';
import { useProducts } from '../../../../shared/context/ProductsContext';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const { products } = useProducts();

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        <CategoryCard
          title="Mobile phones"
          image="./img/category/PhonesCategory.svg"
          link="/phones"
          models={phonesCount}
          variant="category"
        />

        <CategoryCard
          title="Tablets"
          image="./img/category/TabsCategory.svg"
          link="/tablets"
          models={tabletsCount}
          variant="category"
        />

        <CategoryCard
          title="Accessories"
          image="./img/category/AccessoriseCategory.svg"
          link="/accessories"
          models={accessoriesCount}
          variant="category"
        />
      </div>
    </section>
  );
};
