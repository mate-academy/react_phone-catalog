import { useMediaQuery } from 'react-responsive';
import styles from './BannerSlides.module.scss';
import classNames from 'classnames';

export const BannerSlides = () => {
  const isTablet = useMediaQuery({ minWidth: 640 });

  const images = [
    isTablet
      ? '../../../img/banner-images/NowAvailable.png'
      : '../../../img/banner-images/NowAvailable-mobile.png',
    '../../../img/banner-images/banner-accessories.png',
    '../../../img/banner-images/banner-tablets.jpg',
  ];

  return (
    <div className={styles.bannerSlides__imageSlider}>
      {images.map((src, index) => (
        <div
          className={classNames(styles.bannerSlides__imageContainer, {
            [styles.bannerSlides__imageContainerBlack]: index === 0,
          })}
          key={index}
        >
          {isTablet && (
            <div className={styles.bannerSlides__infoContainer}>
              <div className={styles.bannerSlides__info}>
                <div className={styles.bannerSlides__textContainer}>
                  <h1 className={styles.bannerSlides__infoTitle}>
                    Now available in our stores
                  </h1>

                  <p className={styles.bannerSlides__infoDescription}>
                    Be the first
                  </p>
                </div>

                <button className={styles.bannerSlides__infoButton}>
                  Order now
                </button>
              </div>
            </div>
          )}
          <img
            src={src}
            className={styles.bannerSlides__image}
            alt={`Image ${index}`}
          ></img>
        </div>
      ))}
    </div>
  );
};
