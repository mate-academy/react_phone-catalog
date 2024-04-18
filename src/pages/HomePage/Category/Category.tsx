import './Category.scss';
import '../../../utils/main.scss';
import React, { useContext } from 'react';
import { CatalogContext } from '../../CatalogContext';

export const Category = () => {
  const { phonesCount, tabletsCount, accessoriesCount } =
    useContext(CatalogContext);

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
          <img
            // src="https://mate-academy.github.io/react_phone-catalog/_new/img/category-phones.png"
            alt="Mobile"
            className="category__img category__mobile"
          />
          <p className="category__name">Mobile phones</p>
          <div className="category__quantity">{phonesCount}</div>
        </div>
        <div
          className="category__block
          category__block--tablets
          grid__item--tablet-5-8
          grid__item--desktop-9-16"
        >
          <img
            // src="https://mate-academy.github.io/react_phone-catalog/_new/img/category-tablets.png"
            alt="Tablets"
            className="category__img category__tablets"
          />
          <p className="category__name">Tablets</p>
          <div className="category__quantity">{tabletsCount}</div>
        </div>
        <div
          className="category__block
          category__block--accessories
          grid__item--tablet-9-12
          grid__item--desktop-17-24"
        >
          <img
            // src="https://mate-academy.github.io/react_phone-catalog/_new/img/category-accessories.png"
            alt="Accessories"
            className="category__img category__accessories"
          />
          <p className="category__name">Accessories</p>
          <div className="category__quantity">{accessoriesCount}</div>
        </div>
      </div>
    </div>
  );
};
