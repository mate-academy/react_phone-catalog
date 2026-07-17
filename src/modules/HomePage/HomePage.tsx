import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getProducts,
} from '../../api/products';
import { Product } from '../../types/Product';
import { PicturesSlider } from '../shared/components/PicturesSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Loader } from '../shared/components/Loader';
import styles from './HomePage.module.scss';

const categories = [
  {
    to: '/phones',
    title: 'Mobile phones',
    image: 'img/category-phones.webp',
    key: 'phones' as const,
  },
  {
    to: '/tablets',
    title: 'Tablets',
    image: 'img/category-tablets.webp',
    key: 'tablets' as const,
  },
  {
    to: '/accessories',
    title: 'Accessories',
    image: 'img/category-accessories.webp',
    key: 'accessories' as const,
  },
];

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const hotPrices = getHotPriceProducts(products);
  const brandNew = getBrandNewProducts(products);

  const counts = {
    phones: products.filter(p => p.category === 'phones').length,
    tablets: products.filter(p => p.category === 'tablets').length,
    accessories: products.filter(p => p.category === 'accessories').length,
  };

  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.welcome}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider />

      <div className={styles.block}>
        <ProductsSlider title="Brand new models" products={brandNew} />
      </div>

      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Shop by category</h2>
        <div className={styles.categoryGrid}>
          {categories.map(category => (
            <Link
              key={category.key}
              to={category.to}
              className={styles.categoryCard}
            >
              <div className={styles.categoryImageWrap}>
                <img
                  src={category.image}
                  alt={category.title}
                  className={styles.categoryImage}
                />
              </div>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <p className={styles.categoryCount}>
                {counts[category.key]} models
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className={styles.block}>
        <ProductsSlider title="Hot prices" products={hotPrices} />
      </div>
    </div>
  );
};
