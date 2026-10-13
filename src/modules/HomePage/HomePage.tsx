import { useState, useEffect } from 'react';
import { Product } from '../../components/ProductCard';
import { CategoryCard } from '../../components/CategoryCard';
import { ProductsSlider } from '../../components/ProductsSlider';
import { PicturesSlider } from '../../components/PicturesSlider';
import styles from './HomePage.module.scss';
import React from 'react';

const brandNewModels: Product[] = [
  {
    id: 'apple-iphone-14-128gb-midnight',
    category: 'phones',
    name: 'Apple iPhone 14 128GB Midnight',
    priceRegular: 799,
    priceDiscount: 799,
    screen: '6.1" OLED',
    capacity: '128 GB',
    ram: '6 GB',
    images: ['img/phones/apple-iphone-14/midnight/00.webp'],
    price: 0,
  },
  {
    id: 'apple-iphone-14-128gb-purple',
    category: 'phones',
    name: 'Apple iPhone 14 128GB Purple',
    priceRegular: 799,
    priceDiscount: 799,
    screen: '6.1" OLED',
    capacity: '128 GB',
    ram: '6 GB',
    images: ['img/phones/apple-iphone-14/purple/00.webp'],
    price: 0,
  },
  {
    id: 'apple-iphone-14-128gb-yellow',
    category: 'phones',
    name: 'Apple iPhone 14 128GB Yellow',
    priceRegular: 799,
    priceDiscount: 759,
    screen: '6.1" OLED',
    capacity: '128 GB',
    ram: '6 GB',
    images: ['img/phones/apple-iphone-14/yellow/00.webp'],
    price: 0,
  },
  {
    id: 'apple-iphone-14-pro-128gb-gold',
    category: 'phones',
    name: 'Apple iPhone 14 Pro 128GB Gold',
    priceRegular: 999,
    priceDiscount: 999,
    screen: '6.1" OLED',
    capacity: '128 GB',
    ram: '6 GB',
    images: ['img/phones/apple-iphone-14-pro/gold/00.webp'],
    price: 0,
  },
  {
    id: 'apple-iphone-14-pro-128gb-spaceblack',
    category: 'phones',
    name: 'Apple iPhone 14 Pro 128GB Space Black',
    priceRegular: 999,
    priceDiscount: 999,
    screen: '6.1" OLED',
    capacity: '128 GB',
    ram: '6 GB',
    images: ['img/phones/apple-iphone-14-pro/spaceblack/00.webp'],
    price: 0,
  },
];

export const HomePage = () => {
  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  useEffect(() => {
    // Removed leading slash from the fetch URL
    fetch('api/phones.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        const discounted = data.filter(
          item =>
            item.priceRegular &&
            item.priceDiscount &&
            item.priceRegular > item.priceDiscount,
        );

        setHotPrices(discounted);
      })
      .catch(() => {
        // Ошибка обрабатывается тихо без использования console.log
      });
  }, []);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.mainTitle}>Product Catalog</h1>

      <section className={styles.section}>
        <PicturesSlider />
      </section>

      <ProductsSlider title="Brand new models" products={brandNewModels} />

      <section className={styles.section}>
        <div className={styles.categoryHeader}>
          <h2>Shop by category</h2>
        </div>
        <div className={styles.categoriesGrid}>
          <CategoryCard
            title="Mobile phones"
            count={95}
            image="img/category-phones.png"
            link="/phones"
          />
          <CategoryCard
            title="Tablets"
            count={24}
            image="img/category-tablets.png"
            link="/tablets"
          />
          <CategoryCard
            title="Accessories"
            count={100}
            image="img/category-accessories.png"
            link="/accessories"
          />
        </div>
      </section>

      <ProductsSlider title="Hot prices" products={hotPrices} />
    </div>
  );
};
