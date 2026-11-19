import styles from './ProductDetailsSkeleton.module.scss';

export const ProductDetailsSkeleton = () => {
  return (
    <main
      className={styles.main}
      role="status"
      aria-label="Loading product details"
    >
      <span className={styles.visuallyHidden}>Loading product details...</span>

      <div aria-hidden="true">
        <div className={styles.breadcrumbs}>
          <div className={`${styles.placeholder} ${styles.crumb}`} />
          <div className={`${styles.placeholder} ${styles.crumb}`} />
          <div className={`${styles.placeholder} ${styles.crumbLong}`} />
        </div>

        <div className={`${styles.placeholder} ${styles.back}`} />
        <div className={`${styles.placeholder} ${styles.title}`} />

        <div className={styles.productLayout}>
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className={`${styles.placeholder} ${styles.thumbnail}`}
                />
              ))}
            </div>

            <div className={`${styles.placeholder} ${styles.mainImage}`} />
          </div>

          <div className={styles.productInfo}>
            <div className={styles.group}>
              <div className={`${styles.placeholder} ${styles.optionLabel}`} />

              <div className={styles.colors}>
                {Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className={`${styles.placeholder} ${styles.color}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.group}>
              <div className={`${styles.placeholder} ${styles.optionLabel}`} />

              <div className={styles.capacities}>
                {Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={index}
                    className={`${styles.placeholder} ${styles.capacity}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.divider} />

            <div className={`${styles.placeholder} ${styles.price}`} />

            <div className={styles.actions}>
              <div className={`${styles.placeholder} ${styles.addButton}`} />
              <div
                className={`${styles.placeholder} ${styles.favoriteButton}`}
              />
            </div>

            <div className={styles.specs}>
              {Array.from({ length: 4 }, (_, index) => (
                <div className={styles.specRow} key={index}>
                  <div className={`${styles.placeholder} ${styles.specName}`} />
                  <div
                    className={`${styles.placeholder} ${styles.specValue}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <section className={styles.detailsBlock}>
            <div className={`${styles.placeholder} ${styles.sectionTitle}`} />

            {Array.from({ length: 3 }, (_, index) => (
              <div className={styles.paragraph} key={index}>
                <div className={`${styles.placeholder} ${styles.textLine}`} />
                <div className={`${styles.placeholder} ${styles.textLine}`} />
                <div className={`${styles.placeholder} ${styles.textShort}`} />
              </div>
            ))}
          </section>

          <section className={styles.detailsBlock}>
            <div className={`${styles.placeholder} ${styles.sectionTitle}`} />

            {Array.from({ length: 6 }, (_, index) => (
              <div className={styles.specRow} key={index}>
                <div className={`${styles.placeholder} ${styles.specName}`} />
                <div className={`${styles.placeholder} ${styles.specValue}`} />
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};
