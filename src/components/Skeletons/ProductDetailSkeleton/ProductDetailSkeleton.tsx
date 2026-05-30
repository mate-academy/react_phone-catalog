import styles from './ProductDetailSkeleton.module.scss';

export const ProductDetailSkeleton = () => {
  return (
    <div className={`container ${styles.productPage}`}>
      <div className={styles.title} />

      <div className={styles.top}>
        <div className={styles.gallery} />

        <div className={styles.actions}>
          <div className={styles.section}>
            <div className={styles.miniHeader} />
            <div className={styles.colorRow}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={styles.colorCircle} />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.miniHeader} />
            <div className={styles.capacityRow}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={styles.capacityBlock} />
              ))}
            </div>
          </div>

          <div className={styles.priceBlock}>
            <div className={styles.priceNew} />
            <div className={styles.priceOld} />
          </div>

          <div className={styles.btns}>
            <div className={styles.addBtn} />
            <div className={styles.favBtn} />
          </div>

          <div className={styles.tableMini}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.tableRow}>
                <div className={styles.tableCell} />
                <div className={styles.tableCell} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.aboutBlock}>
          <div className={styles.subtitle} />
          {[...Array(2)].map((_, i) => (
            <div key={i} className={styles.paragraphBlock}>
              <div className={styles.paragraphTitle} />
              <div className={styles.paragraphLine} />
              <div className={styles.paragraphLine} />
            </div>
          ))}
        </div>

        <div className={styles.specsBlock}>
          <div className={styles.subtitle} />
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.tableRow}>
              <div className={styles.tableCell} />
              <div className={styles.tableCell} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carouselTitle} />
      <div className={styles.carousel} />
    </div>
  );
};
