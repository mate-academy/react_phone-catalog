import React from 'react';
import { CategoryBlock } from './CategoryBlock';
import { Category } from '../types/Category';

type Props = {
  phonesNumber: number,
};

export const ShopCategory: React.FC<Props> = ({ phonesNumber }) => {
  const categoryApi = [
    {
      name: 'phones',
      title: Category.phones,
      picture: '/_new/categories/phones.svg',
      number: phonesNumber,
    },
    {
      name: 'tablets',
      title: Category.tablets,
      picture: '/_new/categories/tablets.svg',
      number: 24,
    },
    {
      name: 'accessories',
      title: Category.accessories,
      picture: '/_new/categories/accessories.svg',
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
