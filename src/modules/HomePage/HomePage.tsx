import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { PictureSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { Category } from './components/Category';
import { Product } from '../../types/productTypes';
import { useAppContext } from '../../hooks/useAppContext';
import {
  sortByBiggestDiscount,
  sortByNewestModel,
} from '../ProductsPage/utilis/sortedProducts';

const itemsLSider = {
  titleNew: 'Brand new models',
  titleHot: 'Hot prices',
};

export const HomePage = () => {
  const {
    state: { products },
  } = useAppContext();

  const { titleNew, titleHot } = itemsLSider;
  const [newestProducts, setNewestProducts] = useState<Product[] | null>(null);
  const [discountProducts, setDiscountProducts] = useState<Product[] | null>(
    null,
  );

  useEffect(() => {
    const sortedByNewest = sortByNewestModel(products);
    const sortedByDiscount = sortByBiggestDiscount(products);

    setNewestProducts(sortedByNewest);
    setDiscountProducts(sortedByDiscount);
  }, [products]);

  return (
    <main className={styles.main}>
      <h1 className={styles.main__hidden}>Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      <div className={styles.main__wrapper}>
        <PictureSlider />
        <ProductsSlider
          title={titleNew}
          isHot={false}
          products={newestProducts}
        />
        <Category />
        <ProductsSlider
          title={titleHot}
          isHot={true}
          products={discountProducts}
        />
      </div>
    </main>
  );
};
