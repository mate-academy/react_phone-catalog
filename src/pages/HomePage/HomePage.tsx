import { useEffect, useState } from 'react';
import { PicturesSlider } from '../../components/PicturesSlider';
import styles from './HomePage.module.scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../api';
import { Link } from 'react-router-dom';
import { ProductsSlider } from '../../components/ProductsSlider';
import { SliderTitle } from '../../types/SliderTitle';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const newModels = [...products].sort(
    (prodA, prodB) => prodB.year - prodA.year,
  );

  const hotPrices = [...products].sort(
    (prodA, prodB) =>
      prodB.fullPrice - prodB.price - (prodA.fullPrice - prodA.price),
  );

  return (
    <div className={styles.homePage}>
      <div className={styles.front}>
        <h1 className={styles.welcome}>Product Catalog</h1>

        <div className={styles.picturesSlider}>
          <PicturesSlider />
        </div>
      </div>

      <ProductsSlider
        products={newModels}
        showDiscount={false}
        sliderTitle={SliderTitle.NewModels}
      />

      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Shop by category</h2>

        <div className={styles.categoriesWrapper}>
          <Link to="/phones" className={styles.categoryLink}>
            <div className={`${styles.imgWrapper} ${styles.phones}`}>
              <img
                className={styles.categoryImg}
                src="img/category-phones.webp"
                alt="Category phones"
              />
            </div>

            <div className={styles.infoBlock}>
              <h3 className={styles.categoryTitle}>Mobile phones</h3>

              <p className={styles.categoryInfo}>95 models</p>
            </div>
          </Link>

          <Link to="/tablets" className={styles.categoryLink}>
            <div className={`${styles.imgWrapper} ${styles.tablets}`}>
              <img
                className={styles.categoryImg}
                src="img/category-tablets.png"
                alt="Category tablets"
              />
            </div>

            <div className={styles.infoBlock}>
              <h3 className={styles.categoryTitle}>Tablets</h3>

              <p className={styles.categoryInfo}>24 models</p>
            </div>
          </Link>

          <Link to="/accessories" className={styles.categoryLink}>
            <div className={`${styles.imgWrapper} ${styles.accessories}`}>
              <img
                className={styles.categoryImg}
                src="img/category-accessories.png"
                alt="Category accessories"
              />
            </div>

            <div className={styles.infoBlock}>
              <h3 className={styles.categoryTitle}>Accessories</h3>

              <p className={styles.categoryInfo}>100 models</p>
            </div>
          </Link>
        </div>
      </section>

      <section className={styles.hotPricesBlock}>
        <ProductsSlider
          products={hotPrices}
          sliderTitle={SliderTitle.HotPrices}
        />
      </section>
    </div>
  );
};
