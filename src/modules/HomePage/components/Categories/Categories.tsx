import type React from 'react';
import type { Product } from '../../../../types/Product';
import { CATEGORIES } from '../../../../constants/categories';
import styles from './Categories.module.scss';
import { Category } from '../Category';

type Props = {
  products: Product[];
};

export const Categories: React.FC<Props> = ({ products }) => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.list}>
        {CATEGORIES.map(({ category, title, image, color }) => (
          <Category
            key={category}
            imageUrl={image}
            name={title}
            url={`/${category}`}
            color={color}
            quantity={
              products.filter(product => product.category === category).length
            }
          />
        ))}
      </div>
    </section>
  );
};
