import './Category.scss';
import '../../../utils/main.scss';
import React, { useCallback, useContext } from 'react';
import { CatalogContext } from '../../CatalogContext';
import { NavLink } from 'react-router-dom';
import { NotFoundPage } from '../../NotFoundPage/NotFoundPage';
import { Category } from '../../../types/category';

export const CategoryItems = () => {
  const { products } = useContext(CatalogContext);

  const getCategoryCount = useCallback((category: Category) => {
    if (products === undefined) {
      return <NotFoundPage />;
    }

    const countedItems = products.filter(item => item.category === category).length;

    return countedItems === 1
      ? `${countedItems} model`
      : `${countedItems} models`;
    },
    [products],
  );

  const phonesCount = getCategoryCount(Category.Phones);
  const tabletsCount = getCategoryCount(Category.Tablets);
  const accessoriesCount = getCategoryCount(Category.Accessories);

  const BASE_ULR =
    'https://mate-academy.github.io/react_phone-catalog/_new/img/';

  return (
    <div className="category">
      <div className="category__container grid">
        <div
          className="category__top
          grid__item--tablet-1-9
          grid__item--desktop-1-19"
        >
          <h1 className="category__header">Shop by category</h1>
        </div>
        <div
          className="category__block 
          category__block--mobile
          grid__item--tablet-1-4
          grid__item--desktop-1-8"
        >
          <NavLink to="/phones">
            <img
              src={`${BASE_ULR}category-phones.png`}
              alt="Mobile"
              className="category__img category__mobile"
            />
          </NavLink>
          <p className="category__name">Mobile phones</p>
          <div className="category__quantity">{phonesCount}</div>
        </div>
        <div
          className="category__block
          category__block--tablets
          grid__item--tablet-5-8
          grid__item--desktop-9-16"
        >
          <NavLink to="/tablets">
            <img
              src={`${BASE_ULR}category-tablets.png`}
              alt="Tablets"
              className="category__img category__tablets"
            />
          </NavLink>
          <p className="category__name">Tablets</p>
          <div className="category__quantity">{tabletsCount}</div>
        </div>
        <div
          className="category__block
          category__block--accessories
          grid__item--tablet-9-12
          grid__item--desktop-17-24"
        >
          <NavLink to="/accessories">
            <img
              src={`${BASE_ULR}category-accessories.png`}
              alt="Accessories"
              className="category__img category__accessories"
            />
          </NavLink>
          <p className="category__name">Accessories</p>
          <div className="category__quantity">{accessoriesCount}</div>
        </div>
      </div>
    </div>
  );
};
