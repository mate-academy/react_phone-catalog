import { useMediaQuery } from 'react-responsive';
import styles from './Banner.module.scss';

export const Banner = () => {
  const isTablet = useMediaQuery({ minWidth: 640 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

  return (
    <>
      {isMobile && (
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
      )}

      {isTablet && (
        <div className={`${styles.banner} container`}>
          <div className={styles.banner__container}>
            <button className={styles.banner__button}>
              <div className={styles.banner__buttonLeft}></div>
            </button>

            <div className={styles.banner__image}></div>

            <button className={styles.banner__button}>
              <div className={styles.banner__buttonRight}></div>
            </button>
          </div>

          <div className={styles.banner__slider}>
            <div
              className={`${styles.banner__sliders} ${styles.banner__slidersActive}`}
            ></div>

            <div className={styles.banner__sliders}></div>

            <div className={styles.banner__sliders}></div>
          </div>
        </div>
      )}
    </>
  );
};
