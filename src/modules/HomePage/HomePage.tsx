import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Loader } from '../../components/Loader';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const hotPrices = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const brandNew = [...products].sort((a, b) => b.year - a.year);

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container">
        <p className={styles.error}>{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={styles.error__button}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <div className="container">
        <h1 className={styles.homePage__title}>
          Welcome to Nice Gadgets store!
        </h1>

        <PicturesSlider />

        <ProductsSlider
          title="Brand new models"
          products={brandNew}
          hasDiscount={false}
        />
        <section className={styles.categories}>
          <h2 className={styles.categories__title}>Shop by category</h2>

          <div className={styles.categories__grid}>
            <Link to="/phones" className={styles.category}>
              <div
                className={`${styles.category__image} ${styles['category__image--phones']}`}
              >
                <img
                  src="img/category-phones2.png"
                  alt="Phones"
                  className={styles.category__img}
                />
              </div>
              <h3 className={styles.category__name}>Mobile phones</h3>
              <p className={styles.category__count}>{phonesCount} models</p>
            </Link>

            <Link to="/tablets" className={styles.category}>
              <div
                className={`${styles.category__image} ${styles['category__image--tablets']}`}
              >
                <img
                  src="img/category-tablets.png"
                  alt="Tablets"
                  className={styles.category__img}
                />
              </div>
              <h3 className={styles.category__name}>Tablets</h3>
              <p className={styles.category__count}>{tabletsCount} models</p>
            </Link>

            <Link to="/accessories" className={styles.category}>
              <div
                className={`${styles.category__image} ${styles['category__image--accessories']}`}
              >
                <img
                  src="img/category-accessories.png"
                  alt="Accessories"
                  className={styles.category__img}
                />
              </div>
              <h3 className={styles.category__name}>Accessories</h3>
              <p className={styles.category__count}>
                {accessoriesCount} models
              </p>
            </Link>
          </div>
        </section>

        <ProductsSlider title="Hot prices" products={hotPrices} />
      </div>
    </div>
  );
};
