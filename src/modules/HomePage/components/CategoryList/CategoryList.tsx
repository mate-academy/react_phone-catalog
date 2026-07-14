import { Category } from './components/CategoryCard/types';
import { CategoryCard } from './components/CategoryCard';
import styles from './CategoryList.module.scss';
import products from './../../../../../public/api/products.json';
import { CATEGORIES_CONFIG } from './categories';

const categoriesWithCounts: Category[] = CATEGORIES_CONFIG.map(
  (category: Category) => {
    const categoryKey = category.to.replace('/catalog/', '');

    const realCount = products.filter(
      product => product.category === categoryKey,
    ).length;

    return {
      ...category,
      count: realCount,
    };
  },
);

export const CategoryList = () => {
  return (
    <ul className={styles.list}>
      {categoriesWithCounts.map(category => (
        <CategoryCard
          key={category.title}
          to={category.to}
          imageSrc={category.imageSrc}
          altText={category.title}
          title={category.title}
          count={category.count}
        />
      ))}
    </ul>
  );
};
