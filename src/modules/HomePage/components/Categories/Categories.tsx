import { CategoryCard } from '../CategoryCard';
import { FC } from 'react';
import { Product } from '../../../shared/types/Product';
import styles from './Categories.module.scss';

type Props = {
  products: Product[];
};

export const Categories: FC<Props> = ({ products }) => {
  const phonesCount = products.filter(
    product => product.category === 'phones',
  ).length;

  const tabletsCount = products.filter(
    product => product.category === 'tablets',
  ).length;

  const accessoriesCount = products.filter(
    product => product.category === 'accessories',
  ).length;

  const categories = [
    {
      title: 'Mobile phones',
      image: 'img/category-phones.webp',
      modelsCount: phonesCount,
      to: '/phones',
    },
    {
      title: 'Tablets',
      image: 'img/category-tablets.webp',
      modelsCount: tabletsCount,
      to: '/tablets',
    },
    {
      title: 'Accessories',
      image: 'img/category-accessories.webp',
      modelsCount: accessoriesCount,
      to: '/accessories',
    },
  ];

  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <div className={styles.categories__list}>
        {categories.map(category => (
          <div className={styles.categories__item} key={category.title}>
            <CategoryCard
              title={category.title}
              image={category.image}
              modelsCount={category.modelsCount}
              to={category.to}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
