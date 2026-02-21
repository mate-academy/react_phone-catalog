/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import Slider from '../../componenst/Slider/Slider';
import ProductCarousel from '../../componenst/ProductCarousel/ProductCarousel';
import { fetchJSON } from '../../api/client';
import { Product } from '../../types/Product';

const bannerSlides = [
  { id: 'b-phones', image: '/img/banner-phones.png', link: '/phones' },
  { id: 'b-tablets', image: '/img/banner-tablets.png', link: '/tablets' },
  {
    id: 'b-accessories',
    image: '/img/banner-accessories.png',
    link: '/accessories',
  },
];

const categories = [
  {
    title: 'Mobile phones',
    image: './img/category-phones.png',
    link: '/products/phones',
    background: '#6D6474',
    category: 'phones' as const,
    count: 124,
  },
  {
    title: 'Tablets',
    image: './img/category-tablets.png',
    link: '/products/tablets',
    background: '#8d8d92',
    category: 'tablets' as const,
    count: 36,
  },
  {
    title: 'Accessories',
    image: './img/category-accessories.png',
    link: '/products/accessories',
    background: '#973d5f',
    category: 'accessories' as const,
    count: 34,
  },
];

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchJSON<Product[]>('api/products.json');

        setProducts(allProducts);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Brand new: newest by year
  const iphones = useMemo(() => {
    return [...products]
      .sort((a, b) => ((b as any).year ?? 0) - ((a as any).year ?? 0))
      .slice(0, 8);
  }, [products]);

  // Hot prices: biggest absolute discount (fullPrice - price)
  const bestPrices = useMemo(() => {
    const getDiscount = (p: Product) =>
      ((p as any).fullPrice ?? 0) - ((p as any).price ?? 0);

    return [...products]
      .filter(p => getDiscount(p) > 0)
      .sort((a, b) => getDiscount(b) - getDiscount(a))
      .slice(0, 8);
  }, [products]);

  return (
    <section className={styles.homePage}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <div className={styles.homePage__banner}>
        <h2 className={styles.homePage__banner__text}>
          Welcome to Nice Gadgets store!
        </h2>
      </div>
      <div className={styles.sliderRow}>
        <Slider slides={bannerSlides} />
      </div>

      {/* Brand new models carousel */}
      {!loading && iphones.length > 0 && (
        <ProductCarousel
          title="Brand new models"
          products={iphones}
          showDiscount={false}
        />
      )}

      {/* Categories block */}
      <div className={styles.categoriesSection}>
        <h2 className={styles.categoriesSection__title}>Shop by category</h2>
        <div className={styles.categoriesGrid}>
          {categories.map(category => (
            <Link
              key={category.title}
              to={category.link}
              className={styles.categoryCard}
            >
              <div className={styles.categoryCard__content}>
                <div
                  className={styles.categoryCard__imageWrapper}
                  style={{ backgroundColor: category.background }}
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className={styles.categoryCard__image}
                  />
                </div>
                <div className={styles.categoryCard__info}>
                  <h3 className={styles.categoryCard__title}>
                    {category.title}
                  </h3>
                  <p className={styles.categoryCard__count}>
                    {category.count} models
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Best prices carousel */}
      {!loading && bestPrices.length > 0 && (
        <ProductCarousel title="Best prices" products={bestPrices} />
      )}
    </section>
  );
};

export default HomePage;
