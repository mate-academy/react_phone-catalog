import { CategoryCard } from '../../components/CategoryCard';
import { ProductSlider } from '../../components/ProductSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home} id="page-start">
      <div className={`${styles.home__grid} container`}>
        <h1 className={styles.home__title}>Welcome to Nice Gadgets store!</h1>
      </div>

      <div className={styles.banner}>
        <div className={styles.banner__image}></div>

        <div className={styles.banner__slider}>
          <div
            className={`${styles.banner__sliders} ${styles.banner__slidersActive}`}
          ></div>

          <div className={styles.banner__sliders}></div>

          <div className={styles.banner__sliders}></div>
        </div>
      </div>

      <div className={`${styles.home__grid} container`}>
        <section className="blocksIdentation">
          <ProductSlider title={'Brand new models'} />
        </section>

        <section className={`${styles.categories} blocksIdentation`}>
          <h2>Shop by category</h2>

          <div className={styles.categories__container}>
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </div>
        </section>

        <section className="blocksIdentation">
          <ProductSlider title={'Hot prices'} />
        </section>
      </div>
    </div>
  );
};
