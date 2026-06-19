/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  Array<{ id: CategoryType, image: string, path: string }> = [
  { id: 'phones', image: phonesImg, path: '/phones' },
  { id: 'tablets', image: tabletsImg, path: '/tablets' },
  { id: 'accessories', image: accessoriesImg, path: '/accessories' },
];
//#endregion

export const CategoriesSection = () => {
  //#region STATE
  const { categoryCount } = useProducts();
  const { t } = useTranslation();
  //#endregion

  //#region RENDER
  return (
    <div className={categoriesContainer}>
      <h2 className={categoriesTitle}>{t('categoriesSection.title')}</h2>

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
                alt={t(`categoriesSection.names.${category.id}`)}
                className={categoriesImage}
              />
            </div>
            <h3 className={categoriesName}>
              {t(`categoriesSection.names.${category.id}`)}
            </h3>
            <span className={categoriesCount}>
              {categoryCount[category.id] || 0} {t('categoriesSection.count')}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
  //#endregion
};
