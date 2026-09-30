import { useMemo } from 'react';
import { Product } from '../shared/types';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductSlider } from './components/ProductsSlider';

interface Props {
  products: Product[];
}

const getModelsCountText = (count: number) =>
  count === 1 ? '1 model' : `${count} models`;

export const HomePage: React.FC<Props> = ({ products }) => {
  const brandNewProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  const hotPricesProducts = useMemo(() => {
    return [...products]
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;

        return discountB - discountA;
      });
  }, [products]);

  const categoryCounts = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        const category = product.category as keyof typeof acc;

        if (category in acc) {
          return {
            ...acc,
            [category]: acc[category] + 1,
          };
        }

        return acc;
      },
      { phones: 0, tablets: 0, accessories: 0 },
    );
  }, [products]);

  return (
    <main className={styles.homePage}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <section className={styles.section}>
        <h2 className={styles.mainTitle}>Welcome to Nice Gadgets store!</h2>

        <PicturesSlider />
      </section>
      <section className={styles.section}>
        <ProductSlider
          products={brandNewProducts}
          title="Brand new models"
          isDiscountHidden={true}
        />
      </section>

      <section className={styles.section}>
        <h3 className={styles.shopByCategoryTitle}>Shop by category</h3>
        <div className={styles.cards} data-cy="categoryCards">
          <Link to={'/phones'} className={styles.card}>
            <div className={`${styles.imgWrapper} ${styles.imgWrapperPhones}`}>
              <img
                className={styles.categoryImg}
                src="./img/category-mobile-phones.png"
                alt="Mobile phones"
              />
            </div>
            <h4 className={styles.categoryTitle}>Mobile phones</h4>
            <p className={styles.categoryCount}>
              {getModelsCountText(categoryCounts.phones)}
            </p>
          </Link>

          <Link to={'/tablets'} className={styles.card}>
            <div className={`${styles.imgWrapper} ${styles.imgWrapperTablets}`}>
              <img
                className={styles.categoryImg}
                src="./img/category-tablet.png"
                alt="Tablets"
              />
            </div>
            <h4 className={styles.categoryTitle}>Tablets</h4>
            <p className={styles.categoryCount}>
              {getModelsCountText(categoryCounts.tablets)}
            </p>
          </Link>

          <Link to={'/accessories'} className={styles.card}>
            <div
              className={`${styles.imgWrapper} ${styles.imgWrapperAccessories}`}
            >
              <img
                className={styles.categoryImg}
                src="./img/category-accessories-1.png"
                alt="Accessories"
              />
            </div>
            <h4 className={styles.categoryTitle}>Accessories</h4>
            <p className={styles.categoryCount}>
              {getModelsCountText(categoryCounts.accessories)}
            </p>
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <ProductSlider products={hotPricesProducts} title="Hot prices" />
      </section>
    </main>
  );
};
