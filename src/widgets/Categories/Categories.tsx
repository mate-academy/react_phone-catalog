import { useEffect, useState } from 'react';
import { Category } from '../../entities/Category';
import { ProductsService } from '../../services/ProductsService';
import { ICategory } from '../../entities/Category/category.interface';
import styles from './Categories.module.scss';

export const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    ProductsService.getCategories()
      .then(setCategories);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.body}>
        {categories.map(category => (
          <Category key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};
