import React from 'react';
import { CategoryBlock } from './CategoryBlock';
import { Category } from '../types/Category';

type Props = {
  phonesNumber: number,
};

const dom
= 'https://mate-academy.github.io/react_phone-catalog/_new/categories/';

export const ShopCategory: React.FC<Props> = ({ phonesNumber }) => {
  const categoryApi = [
    {
      name: 'phones',
      title: Category.phones,
      picture: `${dom}phones.svg`,
      number: phonesNumber,
    },
    {
      name: 'tablets',
      title: Category.tablets,
      picture: `${dom}tablets.svg`,
      number: 24,
    },
    {
      name: 'accessories',
      title: Category.accessories,
      picture: `${dom}accessories.svg`,
      number: 100,
    },
  ];

  return (
    <section className="category-shop" data-cy="categoryLinksContainer">
      <h1 className="category-shop__title">
        Shop by category
      </h1>
      <CategoryBlock categoryApi={categoryApi} />
    </section>
  );
};
