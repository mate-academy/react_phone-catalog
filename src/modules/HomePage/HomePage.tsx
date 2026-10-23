import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../components/ProductsSlider';
import { NavLink } from 'react-router-dom';
import arrowLeft from '../../img/icons/Slider_ArrowLeft.svg';
import arrowRight from '../../img/icons/Slider_ArrowRight.svg';
import { withBase } from '../../utils/withBase';

const banners = [
  withBase('/img/banner-phones.png'),
  withBase('/img/banner-tablets.png'),
  withBase('/img/banner-accessories.png'),
];

export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(withBase('/api/products.json'))
      .then(response => response.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const handleNext = () => {
    setCurrentSlide(current => (current + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentSlide(current => (current - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const newestProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 15);

  const getCategoryCount = (category: Product['category']) =>
    products.filter(product => product.category === category).length;

  const hotPriceProducts = [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 15);

  return (
    <section className={styles.homePage}>
      <div className={styles.container}>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

        <section className={styles.slider}>
          <button
            type="button"
            className={styles.arrow}
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <img src={arrowLeft} alt="" />
          </button>

          <img
            src={banners[currentSlide]}
            alt="Product banner"
            className={styles.banner}
          />

          <button
            type="button"
            className={styles.arrow}
            onClick={handleNext}
            aria-label="Next slide"
          >
            <img src={arrowRight} alt="" />
          </button>
        </section>

        <div className={styles.dots}>
          {banners.map((banner, index) => (
            <button
              key={banner}
              type="button"
              className={
                index === currentSlide
                  ? `${styles.dot} ${styles.dotActive}`
                  : styles.dot
              }
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <ProductsSlider title="Brand new models" products={newestProducts} />

        <section className={styles.categories}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>

          <div className={styles.categoriesList}>
            <NavLink to="/phones" className={styles.category}>
              <img src={withBase('/img/category-phones.png')} alt="Phones" />
              <h3>Mobile phones</h3>
              {products.length > 0 && (
                <p className={styles.categoryCount}>
                  {getCategoryCount('phones')} models
                </p>
              )}
            </NavLink>

            <NavLink to="/tablets" className={styles.category}>
              <img src={withBase('/img/category-tablets.png')} alt="Tablets" />
              <h3>Tablets</h3>
              {products.length > 0 && (
                <p className={styles.categoryCount}>
                  {getCategoryCount('tablets')} models
                </p>
              )}
            </NavLink>

            <NavLink to="/accessories" className={styles.category}>
              <img
                src={withBase('/img/category-accessories.png')}
                alt="Accessories"
              />
              <h3>Accessories</h3>
              {products.length > 0 && (
                <p className={styles.categoryCount}>
                  {getCategoryCount('accessories')} models
                </p>
              )}
            </NavLink>
          </div>
        </section>
        <ProductsSlider title="Hot prices" products={hotPriceProducts} />
      </div>
    </section>
  );
};
