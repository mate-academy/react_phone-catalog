/* eslint-disable max-len */
import { useContext } from 'react';

import { Category } from '../../../../types/Category';
import { PagesPath } from '../../../../types/PagesPath';
import { getFiltredProducts } from '../../../../utils/productsHelper';
import { ProductsContext } from '../../../../store/ProductsProvider';

import { CategoryCard } from '../CategoryCard';

import PhonesImg from '/public/img/category/category-phones.png';
import TabletsImg from '/public/img/category/category-tablets.png';
import AccessoriesImg from '/public/img/category/category-accessories.png';

import styles from './Categories.module.scss';

const categories: Category[] = [
  {
    id: 'phones',
    title: 'Mobile phones',
    link: PagesPath.Phones,
    img: PhonesImg,
    bgc: '#5f5766',
  },
  {
    id: 'tablets',
    title: 'Tablets',
    link: PagesPath.Tablets,
    img: TabletsImg,
    bgc: '#8c8c91',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    link: PagesPath.Accessories,
    img: AccessoriesImg,
    bgc: '#ac385e',
  },
];

export const Categories = () => {
  const { products } = useContext(ProductsContext);

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
