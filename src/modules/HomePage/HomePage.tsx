import React, { useEffect, useState } from 'react';

import { getProducts } from '../../api/products';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { Product } from '../../types/Product';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(allProducts => {
        setProducts(allProducts);

        const sortedByYear = [...allProducts]
          .sort((a, b) => b.year - a.year)
          .slice(0, 10);

        setNewProducts(sortedByYear);

        const sortedByDiscount = [...allProducts]
          .sort((a, b) => {
            const discountA = a.fullPrice - a.price;
            const discountB = b.fullPrice - b.price;

            return discountB - discountA;
          })
          .slice(0, 10);

        setHotPriceProducts(sortedByDiscount);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <section className={styles.homePage}>
      <div className="container">
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>

        <h1 className={styles.homePageTitle}>Welcome to Nice Gadgets store!</h1>
      </div>

      <div className={styles.picturesSlider}>
        <PicturesSlider />
      </div>

      <div className="container">
        <ProductsSlider
          title="Brand new models"
          products={newProducts}
          isLoading={isLoading}
          showDiscount={false}
        />

        <ShopByCategory
          phonesCount={phonesCount}
          tabletsCount={tabletsCount}
          accessoriesCount={accessoriesCount}
        />

        <ProductsSlider
          title="Hot prices"
          products={hotPriceProducts}
          isLoading={isLoading}
          showDiscount={true}
        />
      </div>
    </section>
  );
};
