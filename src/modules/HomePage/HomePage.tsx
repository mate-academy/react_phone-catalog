import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
//import ProductsSlider from './components/ProductsSlider/index';
import PicturesSlider from './components/PicturesSlider/index';

interface Product {
  id?: string | number;
  name?: string;
}

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = 'api/products.json';

  const [currentIndex, setCurrentIndex] = useState(0);

  const lenOfProducts = products?.length ?? 0;

  useEffect(() => {
    if (lenOfProducts > 0) {
      const id = setInterval(
        () => setCurrentIndex(i => (i + 1) % lenOfProducts),
        5000,
      );

      return () => clearInterval(id);
    }
  }, [lenOfProducts]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [products?.length]);

  const loadProducts = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Product[] = await response.json();

      setProducts(data);
    } catch (err) {
      setError('Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    void loadProducts(controller.signal);

    return () => controller.abort();
  }, []);

  return (
    <>
      <h1 className="visually-hidden">Product Catalog</h1>
      <div className={styles.homePage}>
        <div className={styles.homePage__content}>
          <div className={styles.homePage__bottom}>
            <div className={styles.homePage__up}>
              <h2 className={styles.homePage__title}>
                <span className={styles['homePage__title-welcome']}>
                  Welcome to Nice Gadgets store!
                </span>
              </h2>
            </div>

            {!loading && !error && Array.isArray(products) && (
              <PicturesSlider products={products} currentIndex={currentIndex} />
            )}

            <div className={styles.homePage__dots}>
              <img
                src="/img/dots-2x.png"
                alt="Dots Style"
                className={styles.homePage__dots}
              />
            </div>
          </div>
        </div>
      </div>
      <h3>Brand new models</h3>
      <div className="product-catalog">
        {loading && <div>Loading...</div>}
        {error && <div role="alert">Error: {error}</div>}
        {products && products.length === 0 && <div>No products found.</div>}
      </div>
    </>
  );
};
