import React, { useEffect, useState, useMemo } from 'react';
import styles from './HomePage.module.scss';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { PicturesSlider } from '../PicturesSlider';
import { ProductsSlider } from '../ProductsSlider';
import { ShopByCategory } from '../ShopByCategory';
import { Category } from '../../types/Category';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const categoriesData: Category[] = useMemo(() => {
    const phonesCount = products.filter(p => p.category === 'phones').length;
    const tabletsCount = products.filter(p => p.category === 'tablets').length;
    const accessoriesCount = products.filter(
      p => p.category === 'accessories',
    ).length;

    return [
      {
        id: 'phones',
        title: 'Mobile phones',
        count: phonesCount,
        image: 'img/phones-category.png',
        link: '/phones',
      },
      {
        id: 'tablets',
        title: 'Tablets',
        count: tabletsCount,
        image: 'img/tablets-category.png',
        link: '/tablets',
      },
      {
        id: 'accessories',
        title: 'Accessories',
        count: accessoriesCount,
        image: 'img/accessories-category.png',
        link: '/accessories',
      },
    ];
  }, [products]);

  const hotPricesProducts = useMemo(() => {
    return [...products]
      .filter(p => p.fullPrice && p.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.year - a.year)
      .map(product => ({
        ...product,
        fullPrice: product.price,
      }));
  }, [products]);

  return (
    <main className={styles.homePage}>
      <div className={styles.container}>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>

        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

        <section className={styles.section}>
          <PicturesSlider />
        </section>

        <section className={styles.section}>
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        </section>

        <section className={styles.section}>
          <ShopByCategory categories={categoriesData} />
        </section>

        <section className={styles.section}>
          <ProductsSlider title="Hot prices" products={hotPricesProducts} />
        </section>
      </div>
    </main>
  );
};
