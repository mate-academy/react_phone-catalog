import { Product } from '@/types/Product';
import React, { FC, useMemo } from 'react';

import styles from './Categories.module.scss';
import { CategoryUI } from '../../../shared/types/CategoryUI';
import { CategoryCard } from '../CategoryCard';
import { categories } from '@/modules/shared/constants/categories';

interface Props {
  products: Product[];
  isLoading?: boolean;
}

export const Categories: FC<Props> = React.memo(function Categories({
  products,
  isLoading = false,
}) {
  const categoriesWithCount: CategoryUI[] = useMemo(() => {
    const countMap = products.reduce(
      (acc, product) => {
        const category = product.category;

        acc[category] = (acc[category] || 0) + 1;

        return acc;
      },
      {} as Record<string, number>,
    );

    return categories.map(category => {
      return {
        ...category,
        count: countMap[category.type] || 0,
      };
    });
  }, [products]);

  return (
    <section>
      <h2 className={styles.title}>Shop by category</h2>

      <ul className={styles.categories}>
        {categoriesWithCount.map(category => (
          <li key={category.type} className={styles.categoryContainer}>
            <CategoryCard category={category} isLoading={isLoading} />
          </li>
        ))}
      </ul>
    </section>
  );
});
