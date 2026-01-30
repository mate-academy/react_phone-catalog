import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
//import ProductsSlider from './components/ProductsSlider/index';
//import PicturesSlider from './components/PicturesSlider/index';

interface Product {
  id?: string | number;
  name?: string;
  [key: string]: unknown;
}

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = 'api/products.json';

  const loadProducts = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (signal?.aborted) {
        setError('Unknown error');

        return;
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
console.log('HomePage mounted');

    console.log(window.location.pathname);
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
            <div className={styles.homePage__down}>
              <div className={`${styles.homePage__button}`}>
                <picture>
                  <source
                    srcSet="img/buttons/button-slider-left-desktop.svg"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="img/buttons/button-slider-left-tablet.svg"
                    media="(min-width: 576px)"
                  />
                  <img
                    src="img/buttons/button-slider-left-tablet.svg"
                    alt="The button slider left"
                    title="The button slider left"
                    className={`${styles['homePage__button-slider-left']}`}
                  />
                </picture>
              </div>
              <div className={styles.homePage__banner}></div>
              <div className={styles.homePage__button}>
                <picture>
                  <source
                    srcSet="img/buttons/button-slider-right-desktop.svg"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="img/buttons/button-slider-right-tablet.svg"
                    media="(min-width: 576px)"
                  />
                  <img
                    src="img/buttons/button-slider-right-tablet.svg"
                    alt="The button slider right"
                    title="The button slider right"
                    className={`${styles['homePage__button-slider-right']}`}
                  />
                </picture>
              </div>
            </div>
            <div className={styles.homePage__dots}>
              <img
                src="img/dots-2x.png"
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
        {!loading &&
          !error &&
          Array.isArray(products) &&
          products.map((p, i) => (
            <div key={p.id ?? i}>{p.name ?? JSON.stringify(p)}</div>
          ))}
      </div>
    </>
  );
};
