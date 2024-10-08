import { useContext } from 'react';
import { Category } from '../../../../types/Category';
import { PagesPath } from '../../../../types/PagesPath';
import { getFiltredProducts } from '../../../../utils/getFiltredProducts';
import { CategoryCard } from '../CategoryCard';
import styles from './Categories.module.scss';
import { StateContext } from '../../../../store/GlobalProvider';

const categories: Category[] = [
  {
    id: 'phones',
    title: 'Mobile phones',
    link: PagesPath.Phones,
    img: '/public/img/category/category-phones-2.png',
    bgc: '#5f5766',
  },
  {
    id: 'tablets',
    title: 'Tablets',
    link: PagesPath.Tablets,
    img: '/public/img/category/category-tablets.png',
    bgc: '#8c8c91',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    link: PagesPath.Accessories,
    img: '/public/img/category/category-accessories-2.png',
    bgc: '#ac385e',
  },
];

export const Categories = () => {
  const { products } = useContext(StateContext);

  return (
    <div className={styles.Categories}>
      <h2 className={styles.Categories__title}>Shop by category</h2>

      <div className={styles.Categories__content}>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            count={
              getFiltredProducts(products, pr => pr.category === category.id)
                .length
            }
          />
        ))}
      </div>
    </div>
  );
};
