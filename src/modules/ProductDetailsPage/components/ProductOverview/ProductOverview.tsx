import styles from './ProductOverview.module.scss';

export const ProductOverview = () => {
  return (
    <section className={styles.productOverview}>
      <section className={styles.productOverview__details}>
        <img
          className={styles.details__mainImage}
          src="src/assets/images/detailsPage/00.webp"
          alt=""
        />

        <div className={styles.details__thumbnails}>
          <div className={styles.details__imageWrapper}>
            <img
              className={styles.details__thumbnail}
              src="src/assets/images/detailsPage/00.webp"
              alt=""
            />
          </div>
          <div className={styles.details__imageWrapper}>
            <img
              className={styles.details__thumbnail}
              src="src/assets/images/detailsPage/01.webp"
              alt=""
            />
          </div>
          <div className={styles.details__imageWrapper}>
            <img
              className={styles.details__thumbnail}
              src="src/assets/images/detailsPage/02.webp"
              alt=""
            />
          </div>
          <div className={styles.details__imageWrapper}>
            <img
              className={styles.details__thumbnail}
              src="src/assets/images/detailsPage/03.webp"
              alt=""
            />
          </div>
          <div className={styles.details__imageWrapper}>
            <img
              className={styles.details__thumbnail}
              src="src/assets/images/detailsPage/04.webp"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className={styles.productOverview__options}>
        <div className={styles.productOverview__optionsWrapper}>
          <div className={styles.productOverview__colors}>
            <p className={styles.productOverview__colorTitle}>
              Available colors
            </p>
            <div className={styles.productOverview__colorWrapper}>
              <span className={styles.productOverview__colorOption}></span>
              <span className={styles.productOverview__colorOption}></span>
              <span className={styles.productOverview__colorOption}></span>
              <span className={styles.productOverview__colorOption}></span>
            </div>
          </div>
          <p className={styles.productOverview__productId}>ID: 802390</p>
        </div>

        <hr className={styles.productOverview__line} />

        <div className={styles.productOverview__capacity}>
          <p className={styles.productOverview__capacityTitle}>
            Select capacity
          </p>
          <div className={styles.productOverview__capacityButtons}>
            <button className={styles.productOverview__capacityOption}>
              64 GB
            </button>
            <button className={styles.productOverview__capacityOption}>
              256 GB
            </button>
            <button className={styles.productOverview__capacityOption}>
              512 GB
            </button>
          </div>
        </div>

        <hr className={styles.productOverview__line} />

        <div className={styles.productOverview__cta}>
          <div className={styles.productOverview__price}>
            <h2 className={styles.productOverview__currentPrice}>$799</h2>
            <p className={styles.productOverview__discountPrice}>$1199</p>
          </div>

          <div className={styles.productOverview__addToCart}>
            <button className={styles.productOverview__addButton}>
              Add to Cart
            </button>
            <div className={styles.productOverview__iconWrapper}>
              <img
                className={styles.productOverview__addIcon}
                src="src/assets/icons/product-details/favorites-icon.svg"
                alt="Add to cart"
              />
            </div>
          </div>
        </div>

        <div className={styles.details__specifications}>
          <ul className={styles.details__specList}>
            <li className={styles.details__specItem}>
              <p className={styles.details__specDesc}>Screen</p>
              <p className={styles.details__specCh}>6.5” OLED</p>
            </li>
            <li className={styles.details__specItem}>
              <p className={styles.details__specDesc}>Resolution</p>
              <p className={styles.details__specCh}>2688x1242</p>
            </li>
            <li className={styles.details__specItem}>
              <p className={styles.details__specDesc}>Processor</p>
              <p className={styles.details__specCh}>Apple A12 Bionic</p>
            </li>
            <li className={styles.details__specItem}>
              <p className={styles.details__specDesc}>RAM</p>
              <p className={styles.details__specCh}>3 GB</p>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};
