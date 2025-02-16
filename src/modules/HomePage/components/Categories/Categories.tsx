import styles from './Categories.module.scss';

export const Categories: React.FC = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>

      <div className={styles.categories__content}>
        <div className={styles.categories__category}>
          <div className={styles.categories__window}>
            <img
              className={styles.categories__image}
              src="/img/category-phones1.webp"
              alt="Category Image"
            />
            <div
              style={{ backgroundColor: '#6D6474' }}
              className={styles.categories__background}
            ></div>
          </div>
          <h3 className={styles.categories__name}>Mobile phones</h3>
          <p className={styles.categories__value}>95 Models</p>
        </div>

        <div className={styles.categories__category}>
          <div className={styles.categories__window}>
            <img
              className={styles.categories__image}
              src="/img/category-tablets1.webp"
              alt="Category Image"
            />
            <div
              style={{ backgroundColor: '#8D8D92' }}
              className={styles.categories__background}
            ></div>
          </div>
          <h3 className={styles.categories__name}>Tablets</h3>
          <p className={styles.categories__value}>95 Models</p>
        </div>

        <div className={styles.categories__category}>
          <div className={styles.categories__window}>
            <img
              className={styles.categories__image}
              src="/img/category-accessories1.webp"
              alt="Category Image"
            />
            <div
              style={{ backgroundColor: '#973D5F ' }}
              className={styles.categories__background}
            ></div>
          </div>
          <h3 className={styles.categories__name}>Accessories</h3>
          <p className={styles.categories__value}>95 Models</p>
        </div>
      </div>
    </section>
  );
};
