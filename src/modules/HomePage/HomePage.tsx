import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/services/products';
import { ProductCard } from '../shared/components/ProductCard/ProductCard';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const hotPrices = products
    .filter(product => product.fullPrice && product.fullPrice > product.price)
    .sort(
      (a, b) => (b.fullPrice || 0) - b.price - ((a.fullPrice || 0) - a.price),
    );

  const brandNew = [...products].sort((a, b) => (b.year || 0) - (a.year || 0));

  const getProductCategory = (item: Product) =>
    item.category || (item as unknown as { type: string }).type || '';

  const phonesCount = products.filter(item =>
    getProductCategory(item).startsWith('phone'),
  ).length;

  const tabletsCount = products.filter(item =>
    getProductCategory(item).startsWith('tablet'),
  ).length;

  const accessoriesCount = products.filter(item =>
    getProductCategory(item).startsWith('accessor'),
  ).length;

  if (loading) {
    return <div className={styles.status}>Loading...</div>;
  }

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <section className={styles.banner}>
        <div className={styles.bannerSlide}>
          <img
            src={`${baseUrl}img/banner-phones.png`}
            alt="Main Banner"
            className={styles.bannerImage}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Hot prices</h2>
        </div>
        <div className={styles.goodsList}>
          {hotPrices.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>
        </div>
        <div className={styles.categories}>
          <Link to="/phones" className={styles.categoryCard}>
            <div className={styles.categoryImgWrapper}>
              <img
                src={`${baseUrl}img/category-phones.png`}
                alt="Mobile phones"
              />
            </div>
            <h3 className={styles.categoryTitle}>Mobile phones</h3>
            <p className={styles.categoryCount}>{`${phonesCount} models`}</p>
          </Link>

          <Link to="/tablets" className={styles.categoryCard}>
            <div className={styles.categoryImgWrapper}>
              <img src={`${baseUrl}img/category-tablets.png`} alt="Tablets" />
            </div>
            <h3 className={styles.categoryTitle}>Tablets</h3>
            <p className={styles.categoryCount}>{`${tabletsCount} models`}</p>
          </Link>

          <Link to="/accessories" className={styles.categoryCard}>
            <div className={styles.categoryImgWrapper}>
              <img
                src={`${baseUrl}img/category-accessories.png`}
                alt="Accessories"
              />
            </div>
            <h3 className={styles.categoryTitle}>Accessories</h3>
            <p
              className={styles.categoryCount}
            >{`${accessoriesCount} models`}</p>
          </Link>
        </div>
      </section>

      {/* Brand New Slider */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Brand new models</h2>
        </div>
        <div className={styles.goodsList}>
          {brandNew.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};
