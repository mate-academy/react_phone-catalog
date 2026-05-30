import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { getProducts } from '../../shared/services/products.service';
import { Category, ShortProduct } from '../../shared/models';
import { SmallCarousel } from './SmallCarousel/SmallCarousel';
import { accessories, phones, tablets } from '../../assets/images';
import { BigCarousel } from './BigCarousel/BigCarousel';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [products, setProducts] = useState<ShortProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  function getHotPrices(products: ShortProduct[]): ShortProduct[] {
    return [...products]
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 8);
  }

  function getNewModels(products: ShortProduct[]): ShortProduct[] {
    return [...products].sort((a, b) => b.year - a.year).slice(0, 8);
  }

  function countProductsByCategory(
    products: ShortProduct[],
    category: Category,
  ): string {
    const ammount = products.filter(
      product => product.category === category,
    ).length;

    return `${ammount} ${ammount > 1 ? 'models' : 'model'}`;
  }

  return (
    <div className={`${styles.homePage}`}>
      <h1 className="container">Welcome to Nice Gadgets store!</h1>
      <section className={styles.slider}>
        <BigCarousel />
      </section>

      {!isLoading && (
        <SmallCarousel
          products={getHotPrices(products)}
          title="Brand new models"
        />
      )}

      <section className="container byCategory">
        <h2>Shop by category</h2>
        <div className={styles.byCategory__container}>
          <Link to="/products/phones" className={styles.byCategory__block}>
            <div className={styles.byCategory__img}>
              <img src={phones} alt="phones" />
            </div>
            <div className={styles.byCategory__text}>
              <h4>Mobile phones</h4>
              <div className={styles.byCategory__number}>
                {countProductsByCategory(products, 'phones')}
              </div>
            </div>
          </Link>
          <Link to="/products/tablets" className={styles.byCategory__block}>
            <div className={styles.byCategory__img}>
              <img src={tablets} alt="tablets" />
            </div>
            <div className={styles.byCategory__text}>
              <h4>Tablets</h4>
              <div className={styles.byCategory__number}>
                {countProductsByCategory(products, 'tablets') + ' '}
              </div>
            </div>
          </Link>
          <Link to="/products/accessories" className={styles.byCategory__block}>
            <div className={styles.byCategory__img}>
              <img src={accessories} alt="accessories" />
            </div>
            <div className={styles.byCategory__text}>
              <h4>Accessories</h4>
              <div className={styles.byCategory__number}>
                {countProductsByCategory(products, 'accessories')}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {!isLoading && (
        <SmallCarousel
          products={getNewModels(products)}
          title="Hot prices"
          discount={true}
        />
      )}
    </div>
  );
};
