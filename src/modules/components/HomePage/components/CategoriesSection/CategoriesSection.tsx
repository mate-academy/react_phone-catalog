/* eslint-disable prettier/prettier */

import { Link } from 'react-router-dom';

import phonesImg from '@/assets/img/category-phones.png';
import tabletsImg from '@/assets/img/categoty-tablets.png';
import accessoriesImg from '@/assets/img/category-accessories.png';

import styles from './CategoriesSection.module.scss';

const {
  sectionContainer,
  sectionTitle,
  categoriesGrid,
  categoryCard,
  imageWrapper,
  categoryImage,
  categoryName,
  modelsCount,
} = styles;

export const CategoriesSection = () => {
  const categories = [
    {
      id: 'phones',
      name: 'Mobile phones',
      count: '95 models',
      image: phonesImg,
      path: '/phones',
    },
    {
      id: 'tablets',
      name: 'Tablets',
      count: '24 models',
      image: tabletsImg,
      path: '/tablets',
    },
    {
      id: 'accessories',
      name: 'Accessories',
      count: '100 models',
      image: accessoriesImg,
      path: '/accessories',
    }
  ];

  return (
    <div className={sectionContainer}>
      <h2 className={sectionTitle}>Shop by category</h2>

      <div className={categoriesGrid}>
        {categories.map((category) => (
          <Link
            to={category.path}
            className={categoryCard}
            key={category.id}
          >
            <div className={imageWrapper}>
              <img
                src={category.image}
                alt={category.name}
                className={categoryImage}
              />
            </div>
            <h3 className={categoryName}>{category.name}</h3>
            <span className={modelsCount}>{category.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
