import styles from './ProductSkeleton.module.scss';

export const ProductSkeleton = () => {
  return (
    <div className={styles.ProductCardDetails}>
      <div className={styles.content}>
        <div className={`${styles.breadcrumb} skeleton`} />

        <div className={`${styles.title} skeleton`} />

        <div className={styles.item}>
          <div className={styles.left}>
            <div className={`${styles.mainImage} skeleton`} />

            <div className={styles.pictures}>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className={`${styles.picture} skeleton`} />
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.options}>
              <div className={styles.colorsBlock}>
                <div className={`${styles.label} skeleton`} />

                <div className={styles.colorsOptions}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className={`${styles.color} skeleton`} />
                  ))}
                </div>
              </div>

              <div className={styles.capacityBlock}>
                <div className={`${styles.label} skeleton`} />

                <div className={styles.capacityOptions}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className={`${styles.capacity} skeleton`}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.productInfo}>
                <div className={`${styles.price} skeleton`} />

                <div className={styles.infoSpecs}>
                  <div className={`${styles.infoLine} skeleton`} />
                  <div className={`${styles.infoLine} skeleton`} />
                  <div className={`${styles.infoLine} skeleton`} />
                </div>

                <div className={`${styles.button} skeleton`} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.addInfo}>
          <div className={styles.leftPart}>
            <div className={`${styles.sectionTitle} skeleton`} />

            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={`${styles.textLine} skeleton`} />
            ))}
          </div>

          <div className={styles.rightPart}>
            <div className={`${styles.sectionTitle} skeleton`} />

            <div className={styles.specs}>
              {Array.from({ length: 7 }).map((_, index) => (
                <div className={styles.spec} key={index}>
                  <div className={`${styles.specKey} skeleton`} />
                  <div className={`${styles.specValue} skeleton`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
