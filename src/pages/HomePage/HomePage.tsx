// import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Categories } from '../../components/Categories/Categories';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import styles from './HomePage.module.scss';

import { useProducts } from '../../hooks/useProducts';

import { isPhone } from '../../utils/typeGuards';
import { mapProductToCard } from '../../utils/mapProductToCard';

export const HomePage = () => {
  const { products } = useProducts();

  const phonesApi = products.filter(isPhone).map(mapProductToCard);
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const phonesCount = products.filter(p => p.category === 'phones').length;

  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  const categories = [
    {
      title: 'Mobile phones',
      count: phonesCount,
      image: 'img/category-phones.webp',
      link: '/phones',
      className: 'phones',
    },
    {
      title: 'Tablets',
      count: tabletsCount,
      image: 'img/category-tablets.webp',
      link: '/tablets',
      className: 'tablets',
    },
    {
      title: 'Accessories',
      count: accessoriesCount,
      image: 'img/category-accessories.webp',
      link: '/accessories',
      className: 'accessories',
    },
  ];

  const hotPhones = phonesApi;

  return (
    <main className={styles.home}>
      {/* Slider */}
      <Banner />

      <ProductSlider
        name="Brand new models"
        items={hotPhones}
        showDiscount={false}
      />

      <Categories categories={categories} />

      <ProductSlider name="Hot prices" items={phonesApi} showDiscount={true} />
    </main>
  );
};
