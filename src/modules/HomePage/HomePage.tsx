import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../shared/api/products';
import type { Product } from '../shared/types';
import { PicturesSlider } from '../shared/components/PicturesSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Loader } from '../shared/components/Loader';
import { getImageUrl } from '../shared/utils/getImageUrl';
import styles from './HomePage.module.scss';

const heroSlides = [
  {
    image: getImageUrl('img/banner-phones.png'),
    alt: 'Latest smartphones lineup',
    title: 'Now available in our store!',
    subtitle: 'Be the first!',
    ctaLabel: 'Order now',
    ctaTo: '/phones',
  },
  {
    image: getImageUrl('img/banner-tablets.png'),
    alt: 'Tablets built for creators',
    title: 'New tablets just dropped',
    subtitle: 'Check them out',
    ctaLabel: 'Order now',
    ctaTo: '/tablets',
  },
  {
    image: getImageUrl('img/banner-accessories.png'),
    alt: 'Accessories that complete the set',
    title: 'Complete your setup',
    subtitle: 'Shop accessories',
    ctaLabel: 'Order now',
    ctaTo: '/accessories',
  },
];

const categories: { category: Product['category']; name: string }[] = [
  { category: 'phones', name: 'Phones' },
  { category: 'tablets', name: 'Tablets' },
  { category: 'accessories', name: 'Accessories' },
];

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const hotPrices = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 12);

  const brandNew = [...products].sort((a, b) => b.year - a.year).slice(0, 12);

  const brandNewNoDiscount = brandNew.map(product => ({
    ...product,
    fullPrice: product.price,
  }));

  const countByCategory = (category: Product['category']) =>
    products.filter(p => p.category === category).length;

  const categoryImage = (category: Product['category']) =>
    products.find(p => p.category === category)?.image;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.hiddenTitle}>Product Catalog</h1>

      <div className={styles.slider}>
        <PicturesSlider slides={heroSlides} />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductsSlider
            title="Brand new models"
            products={brandNewNoDiscount}
          />

          <section className={styles.categories}>
            <h2 className={styles.sectionTitle}>Shop by category</h2>
            <div className={styles.categoryGrid}>
              {categories.map(({ category, name }) => (
                <Link
                  key={category}
                  to={`/${category}`}
                  className={styles.categoryCard}
                >
                  <img
                    src={getImageUrl(categoryImage(category) || '')}
                    alt={name}
                    className={styles.categoryImage}
                  />
                  <span className={styles.categoryName}>{name}</span>
                  <span className={styles.categoryCount}>
                    {countByCategory(category)} models
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <ProductsSlider title="Hot prices" products={hotPrices} />
        </>
      )}
    </div>
  );
};
