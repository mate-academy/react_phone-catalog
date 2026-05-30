import styles from './DetailsPageSkeleton.module.scss';

export const DetailsPageSkeleton = () => (
  <>
    <div className="container">
      <div className={styles.return}>
        <div
          className={styles['loading-sub-text']}
          style={{ width: '40px', height: '12px', marginBlockStart: '24px' }}
        />
      </div>

      <div
        className={styles['loading-main-text']}
        style={{ width: '200px', height: '28px', marginBottom: '32px' }}
      />

      <div className={styles.detailsPage}>
        <div className={(styles['movie--isloading'], styles['main-img'])}>
          <div
            className={styles['loading-image']}
            style={{ height: '300px' }}
          />
        </div>

        <div className={(styles['movie--isloading'], styles['spec-selector'])}>
          <div
            className={styles['loading-image']}
            style={{ height: '300px' }}
          />
        </div>
      </div>
    </div>
    <div className={`container ${styles.info}`}>
      <article className={styles.about}>
        <div
          className={styles['loading-main-text']}
          style={{ width: '120px', height: '20px', marginBottom: '16px' }}
        />
        <div className={styles.about__description}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i}>
              <div
                className={styles['loading-main-text']}
                style={{ width: '160px', height: '16px' }}
              />
              <div
                className={styles['loading-sub-text']}
                style={{ width: '100%', height: '60px', marginTop: '16px' }}
              />
            </div>
          ))}
        </div>
      </article>

      <article className={styles.specs}>
        <div
          className={styles['loading-main-text']}
          style={{ width: '140px', height: '20px', marginBottom: '16px' }}
        />
        <hr />
        <div className={styles.specs__description}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles['specs__description--item']}>
              <div
                className={styles['loading-sub-text']}
                style={{ width: '40%' }}
              />
              <div
                className={styles['loading-sub-text']}
                style={{ width: '30%' }}
              />
            </div>
          ))}
        </div>
      </article>
    </div>

    <div className="container">
      <div
        className={styles['loading-main-text']}
        style={{ width: '200px', height: '20px', marginBottom: '24px' }}
      />
      <div className={styles.container}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.col}>
            <div className={styles['movie--isloading']}>
              <div className={styles['loading-image']} />
              <div className={styles['loading-content']}>
                <div className={styles['loading-text-container']}>
                  <div className={styles['loading-main-text']} />
                  <div className={styles['loading-sub-text']} />
                </div>
                <div className={styles['loading-btn']} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default DetailsPageSkeleton;
