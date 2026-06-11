/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link } from 'react-router-dom';

import phonesImg from '@/assets/img/category-phones.png';
import tabletsImg from '@/assets/img/categoty-tablets.png';
import accessoriesImg from '@/assets/img/category-accessories.png';

import styles from './CategoriesSection.module.scss';
//#endregion

//#region STYLES_&_CONSTANTS
const {
  categoriesContainer,
  categoriesTitle,
  categoriesGrid,
  categoriesCard,
  categoriesImageWrapper,
  categoriesImage,
  categoriesName,
  categoriesCount,
} = styles;

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
  },
];
//#endregion

export const CategoriesSection = () => {
  //#region RENDER
  return (
    <div className={categoriesContainer}>
      <h2 className={categoriesTitle}>Shop by category</h2>

      <div className={categoriesGrid}>
        {categories.map((category) => (
          <Link
            to={category.path}
            className={categoriesCard}
            key={category.id}
          >
            <div className={categoriesImageWrapper}>
              <img
                src={category.image}
                alt={category.name}
                className={categoriesImage}
              />
            </div>
            <h3 className={categoriesName}>{category.name}</h3>
            <span className={categoriesCount}>{category.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
  //#endregion
};
