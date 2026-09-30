import React from 'react';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { BrandNewModels } from '../../components/BrandNewModels/BrandNewModels';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { HotPrice } from '../../components/HotPrice/HotPrice';
import { Product } from '../../types/Product';
import styles from './HomePage.module.scss';

interface HomePageProps {
  products: Product[];
}

export const HomePage = ({ products }: HomePageProps) => {
  return (
    <>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <BannerSlider />
      <BrandNewModels products={products} />
      <ShopByCategory />
      <HotPrice products={products} />
    </>
  );
};
