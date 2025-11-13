import React, { useContext } from 'react';
import './Catecories.scss';
import { SectionTitle } from '../../../../shared/components/SectionTitle/SectionTitle';
import {
  homeCategoryPhones,
  homeCategoryTablets,
  homeCategoryAccessories,
} from '../../../../../global-assets/static';
import { CategoryItem } from '../CategoryItem';
import { ProductListContext } from '../../../../shared/context/ProductListContext';
import { Category } from '../../../../shared/types/Category';
import { TranslationContext } from '../../../../../i18next/shared';

export const Categories: React.FC = () => {
  const { phonesAmount, tabletsAmount, accessoriesAmount } =
    useContext(ProductListContext);
  const text = useContext(TranslationContext);
  const categoryInfo = text.categoryItem;

  const getCategoryList = () => {
    const result: Category[] = [];

    categoryInfo.forEach(info => {
      switch (info.category) {
        case 'phones':
          result.push({
            category: info.category,
            src: homeCategoryPhones,
            title: info.title,
            info: `${phonesAmount} ${info.details}`,
          });

          break;
        case 'tablets':
          result.push({
            category: info.category,
            src: homeCategoryTablets,
            title: info.title,
            info: `${tabletsAmount} ${info.details}`,
          });

          break;
        case 'accessories':
          result.push({
            category: info.category,
            src: homeCategoryAccessories,
            title: info.title,
            info: `${accessoriesAmount} ${info.details}`,
          });

          break;
      }
    });

    return result;
  };

  const categoryList = getCategoryList();

  return (
    <section className="categories">
      <div className="categories__wrapper">
        <SectionTitle text={text.homePage.homeCategoryTitle} />
        <div className="categories__content">
          {categoryList.map(category => (
            <CategoryItem category={category} key={category.src} />
          ))}
        </div>
      </div>
    </section>
  );
};
