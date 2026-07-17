import styles from './Homepage.styles.module.scss';

import { BannerSlider } from '../../modules/BannerSlider';
import { ProductSlider } from '../../modules/ProductSlider';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Products';
import { ShopByCategory } from '../../modules/ShopByCategory';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/api/products.json`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
  }, []);

  const newModels = [...products].sort((a, b) => b.year - a.year);

  const hotPrices = [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return (
    <>
      <section className={styles.homePage}>
        <h1 className={styles.visuallyHiden}>Product Catalog</h1>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
        <BannerSlider />

        <ProductSlider
          title="Brand new models"
          products={newModels}
          showDiscount={false}
        />

        <ShopByCategory />

        <ProductSlider title="Hot prices" products={hotPrices} />
      </section>
    </>
  );
};
