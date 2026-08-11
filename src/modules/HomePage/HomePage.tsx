import React, { useMemo } from 'react';
import styles from './HomePage.module.scss';
import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import { Product } from '../../types/Product';

import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';



interface Props {
  products: Product[];
}
export const HomePage: React.FC<Props> = ({ products }) => {
  const brandNewProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.year - a.year)
      .slice(0, 10)
      .map(product => ({
        ...product,
        fullPrice: product.price,
      }));
  }, [products]);

  const hotPricesProducts = useMemo(() => {
    return [...products]
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 10);
  }, [products]);

  const categoriesCount = useMemo(() => {
    return {
      phones: products.filter(p => p.category === 'phones').length,
      tablets: products.filter(p => p.category === 'tablets').length,
      accessories: products.filter(p => p.category === 'accessories').length,
    };
  }, [products]);


      return (
    <div className={styles.home}>
      {/* Прихований заголовок для SEO */}
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>
      
      
      <div className={styles.container}>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
        
        {/* Головний слайдер з банерами */}
        <div className={styles.section}>
          <PicturesSlider />
        </div>

        {/* Слайдер 1: Новинки  */}
        <div className={styles.section}>
          <ProductsSlider title="Brand new models" products={brandNewProducts} />
        </div>

        <div className={styles.section}>
          <ShopByCategory categoriesCount={categoriesCount} />
        </div>

        {/* Слайдер 2: Гарячі ціни */}
        <div className={styles.section}>
          <ProductsSlider title="Hot prices" products={hotPricesProducts} />
        </div>
      </div> 
    </div>
  );

 
};
