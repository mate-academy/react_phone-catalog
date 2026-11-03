import { BannerSlider, type BannerSlide } from './components/BannerSlider';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import { ProductSlider } from '../../components/ProductSlider';
import { Categories } from './components/Categories';

import {
  getBrandNewPhones,
  getHotDiscounts,
} from '../../services/productService';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const slides: BannerSlide[] = [
  {
    id: '1',
    to: '/phones',
    alt: 'iPhone 14 Pro, now available in our store',
    desktopSrc: 'img/phones-baner.png',
    mobileSrc: 'img/phones-baner-mobile.png',
  },
  {
    id: '2',
    to: '/phones',
    alt: 'iPhone 14 Pro, now available in our store',
    desktopSrc: 'img/phones-baner.png',
    mobileSrc: 'img/phones-baner-mobile.png',
  },
  {
    id: '3',
    to: '/phones',
    alt: 'iPhone 14 Pro, now available in our store',
    desktopSrc: 'img/phones-baner.png',
    mobileSrc: 'img/phones-baner-mobile.png',
  },
];

export const HomePage = () => {
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  const [hotDiscounts, setHotDiscounts] = useState<Product[]>([]);

  useEffect(() => {
    getBrandNewPhones().then(setBrandNewModels);
    getHotDiscounts().then(setHotDiscounts);
  }, []);

  return (
    <main className={cx('home-page')}>
      <section className={cx('home-page__header')}>
        <h1 className={cx('visually-hidden')}>Product Catalog</h1>
        <h2>Welcome to Nice Gadgets store!</h2>
        <BannerSlider slides={slides} />
      </section>

      <ProductSlider title="Brand new models" products={brandNewModels} />
      <Categories />
      <ProductSlider title="Hot prices" products={hotDiscounts} />
    </main>
  );
};
