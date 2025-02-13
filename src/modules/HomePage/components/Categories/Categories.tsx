import styles from './Categories.module.scss';

import { Category } from '@HomePage/types/Category';
import { CategoryComponent } from '@HomePage/components/CategoryComponent';

import { useAppSelector } from '@store/hooks';

export const Categories = () => {
  const { products } = useAppSelector(state => state.products);

  const categories: Category[] = [
    {
      bgColor: '#6D6474',
      title: 'Mobile phones',
      img: './img/category-phones.webp',
      amount: products.phones.length,
      url: './phones',
    },
    {
      bgColor: '#8D8D92',
      title: 'Tablets',
      img: './img/category-tablets.png',
      amount: products.tablets.length,
      url: './tablets',
    },
    {
      bgColor: '#D53C51',
      title: 'Accessories',
      img: './img/category-accessories.png',
      amount: products.accessories.length,
      url: './accessories',
    },
  ];

  return (
    <section aria-label="Shop By Category" className={styles.categories}>
      <div className={styles.categories__header}>
        <h2>Shop by category</h2>
      </div>

      <div className={styles.categories__categories}>
        {categories.map(category => (
          <CategoryComponent
            key={category.title}
            className={styles.categories__category}
            category={category}
          />
        ))}
      </div>
    </section>
  );
};
