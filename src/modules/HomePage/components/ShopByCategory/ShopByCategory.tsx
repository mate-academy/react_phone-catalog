import { ModelsCount } from '@/types/ModelsCount';
import { CategoryCard } from './components/CategoryCard';
import styles from './ShopByCategory.module.scss';

interface Props {
  modelsCount: ModelsCount;
  isLoading?: boolean;
}

export const ShopByCategory = ({ modelsCount, isLoading = false }: Props) => {
  return (
    <section className={styles.shopByCategory}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.content}>
        <CategoryCard
          linkURL="/phones"
          imgURL="img/categories/category-phones.png"
          title="Mobile phones"
          modelsCount={modelsCount.phones}
          isLoading={isLoading}
        />

        <CategoryCard
          linkURL="/tablets"
          imgURL="img/categories/category-tablets.png"
          title="Tablets"
          modelsCount={modelsCount.tablets}
          isLoading={isLoading}
        />

        <CategoryCard
          linkURL="/accessories"
          imgURL="img/categories/category-accessories.png"
          title="Accessories"
          modelsCount={modelsCount.accessories}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};
