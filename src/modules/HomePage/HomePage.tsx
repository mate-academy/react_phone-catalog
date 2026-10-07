import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { getProducts } from '../../api/products';

import { ProductCard } from '../../components/ProductCard';

import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';

import { Product } from '../../types/Product';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const loadedProducts = await getProducts();

        setProducts(loadedProducts);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const hotPrices = [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((first, second) => {
      const firstDiscount = first.fullPrice - first.price;
      const secondDiscount = second.fullPrice - second.price;

      return secondDiscount - firstDiscount;
    })
    .slice(0, 8);

  const brandNew = [...products]
    .sort((first, second) => second.year - first.year)
    .slice(0, 8);

  const phonesCount = products.filter(
    product => product.category === 'phones',
  ).length;

  const tabletsCount = products.filter(
    product => product.category === 'tablets',
  ).length;

  const accessoriesCount = products.filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <main className={styles.homePage}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <PicturesSlider />

      {loading && <p className={styles.message}>Loading products...</p>}

      {error && (
        <p className={styles.error}>
          Unable to load products. Please try again.
        </p>
      )}

      {!loading && !error && (
        <>
          <section className={styles.section}>
            <h2>Hot prices</h2>

            {hotPrices.length > 0 ? (
              <div className={styles.productsGrid}>
                {hotPrices.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className={styles.message}>No products available.</p>
            )}
          </section>

          <section className={styles.section}>
            <h2>Shop by category</h2>

            <div className={styles.categories}>
              <Link to="/phones" className={styles.category}>
                <div className={styles.categoryImage}>
                  <img src="img/category-phones.png" alt="Mobile phones" />
                </div>

                <h3>Mobile phones</h3>

                <p>{phonesCount} models</p>
              </Link>

              <Link to="/tablets" className={styles.category}>
                <div className={styles.categoryImage}>
                  <img src="img/category-tablets.png" alt="Tablets" />
                </div>

                <h3>Tablets</h3>

                <p>{tabletsCount} models</p>
              </Link>

              <Link to="/accessories" className={styles.category}>
                <div className={styles.categoryImage}>
                  <img src="img/category-accessories.png" alt="Accessories" />
                </div>

                <h3>Accessories</h3>

                <p>{accessoriesCount} models</p>
              </Link>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Brand new</h2>

            <div className={styles.productsGrid}>
              {brandNew.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
};
