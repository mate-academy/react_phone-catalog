import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/fetchClient';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import styles from './HomePage.module.scss';

const BANNERS = [
  { image: '/img/banner-phones.png', alt: 'Phones', link: '/phones' },
  { image: '/img/banner-tablets.png', alt: 'Tablets', link: '/tablets' },
  {
    image: '/img/banner-accessories.png',
    alt: 'Accessories',
    link: '/accessories',
  },
];

const CATEGORIES = [
  { to: '/phones', label: 'Phones', image: '/img/category-phones.webp' },
  { to: '/tablets', label: 'Tablets', image: '/img/category-tablets.webp' },
  {
    to: '/accessories',
    label: 'Accessories',
    image: '/img/category-accessories.webp',
  },
];

export const HomePage = () => {
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [brandNew, setBrandNew] = useState<Product[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    getProducts().then(products => {
      const byDiscount = [...products].sort((a, b) => {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;

        return discountB - discountA;
      });

      setHotPrices(byDiscount.slice(0, 10));

      const byYear = [...products].sort((a, b) => b.year - a.year);

      setBrandNew(byYear.slice(0, 10));

      setCounts({
        phones: products.filter(p => p.category === 'phones').length,
        tablets: products.filter(p => p.category === 'tablets').length,
        accessories: products.filter(p => p.category === 'accessories').length,
      });
    });
  }, []);

  return (
    <div className={styles.page}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <PicturesSlider items={BANNERS} />

      <ProductsSlider title="Hot prices" products={hotPrices} />

      <section className={styles.categories}>
        <h2 className={styles.categoriesTitle}>Shop by category</h2>

        <div className={styles.categoriesGrid}>
          {CATEGORIES.map(category => (
            <Link
              key={category.to}
              to={category.to}
              className={styles.categoryCard}
            >
              <div className={styles.categoryImageWrapper}>
                <img
                  src={category.image}
                  alt={category.label}
                  className={styles.categoryImage}
                />
              </div>
              <h3 className={styles.categoryLabel}>{category.label}</h3>
              <p className={styles.categoryCount}>
                {counts[category.to.slice(1)] ?? 0} models
              </p>
            </Link>
          ))}
        </div>
      </section>

      <ProductsSlider title="Brand new models" products={brandNew} />
    </div>
  );
};
