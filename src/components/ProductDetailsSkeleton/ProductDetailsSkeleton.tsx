import styles from './ProductDetailsSkeleton.module.scss';

const thumbs = [0, 1];
const colors = [0, 1, 2, 3, 4];
const capacities = [0, 1, 2];
const specs = [0, 1, 2, 3];
const techSpecs = [0, 1, 2, 3, 4];

export const ProductDetailsSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <div className={`${styles.block} ${styles.breadcrumb}`} />
        <div className={`${styles.block} ${styles.breadcrumbShort}`} />
        <div className={`${styles.block} ${styles.breadcrumb}`} />
      </div>

      <div className={`${styles.block} ${styles.back}`} />
      <div className={`${styles.block} ${styles.title}`} />

      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {thumbs.map(item => (
              <div
                key={item}
                className={`${styles.block} ${styles.thumbnail}`}
              />
            ))}
          </div>
          <div className={`${styles.block} ${styles.mainImage}`} />
        </div>

        <div className={styles.options}>
          <div className={styles.optionRow}>
            <div className={`${styles.block} ${styles.label}`} />
            <div className={`${styles.block} ${styles.id}`} />
          </div>
          <div className={styles.colors}>
            {colors.map(item => (
              <div key={item} className={`${styles.block} ${styles.color}`} />
            ))}
          </div>

          <div className={`${styles.block} ${styles.divider}`} />

          <div className={styles.optionRow}>
            <div className={`${styles.block} ${styles.labelWide}`} />
          </div>
          <div className={styles.capacities}>
            {capacities.map(item => (
              <div
                key={item}
                className={`${styles.block} ${styles.capacity}`}
              />
            ))}
          </div>

          <div className={`${styles.block} ${styles.divider}`} />

          <div className={styles.prices}>
            <div className={`${styles.block} ${styles.price}`} />
            <div className={`${styles.block} ${styles.oldPrice}`} />
          </div>

          <div className={styles.actions}>
            <div className={`${styles.block} ${styles.addToCart}`} />
            <div className={`${styles.block} ${styles.favorite}`} />
          </div>

          <div className={styles.specs}>
            {specs.map(item => (
              <div key={item} className={styles.specRow}>
                <div className={`${styles.block} ${styles.specLabel}`} />
                <div className={`${styles.block} ${styles.specValue}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.about}>
          <div className={`${styles.block} ${styles.sectionTitle}`} />
          <div className={`${styles.block} ${styles.divider}`} />
          <div className={`${styles.block} ${styles.line}`} />
          <div className={`${styles.block} ${styles.line}`} />
          <div className={`${styles.block} ${styles.lineShort}`} />
        </div>

        <div className={styles.techSpecs}>
          <div className={`${styles.block} ${styles.sectionTitle}`} />
          <div className={`${styles.block} ${styles.divider}`} />
          {techSpecs.map(item => (
            <div key={item} className={styles.specRow}>
              <div className={`${styles.block} ${styles.specLabel}`} />
              <div className={`${styles.block} ${styles.specValue}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
