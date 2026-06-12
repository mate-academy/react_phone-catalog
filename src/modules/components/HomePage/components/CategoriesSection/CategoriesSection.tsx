/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link } from 'react-router-dom';

import { useProducts } from '@/modules/shared/utils/context/ProductsContext';
import { CategoryType } from '@/modules/shared/utils/types';

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

const categories:
  Array<{
    id: CategoryType,
    name: string,
    image: string,
    path: string,
  }>
  = [
  {
    id: 'phones',
    name: 'Mobile phones',
    image: phonesImg,
    path: '/phones',
  },
  {
    id: 'tablets',
    name: 'Tablets',
    image: tabletsImg,
    path: '/tablets',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: accessoriesImg,
    path: '/accessories',
  },
];
//#endregion

export const CategoriesSection = () => {
  //#region STATE
  const { categoryCount} = useProducts();
  //#endregion

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
            <span className={categoriesCount}>
              {categoryCount[category.id] || 0} models
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
  //#endregion
};
