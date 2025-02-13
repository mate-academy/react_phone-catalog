import { useMediaQuery } from 'react-responsive';
import styles from './BannerSlides.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export const BannerSlides = () => {
  const isTablet = useMediaQuery({ minWidth: 640 });
  const { bannerSlides } = useContext(AppContext)!;

  // console.log(bannerSlides);

  // const images = [
  //   isTablet
  //     ? '../../../img/banner-images/NowAvailable.png'
  //     : '../../../img/banner-images/NowAvailable-mobile.png',
  //   '../../../img/banner-images/banner-accessories.png',
  //   '../../../img/banner-images/banner-tablets.jpg',
  // ];

  return (
    <div className={styles.bannerSlides__imageSlider}>
      {bannerSlides.map((slide, index) => (
        <div
          className={classNames(styles.bannerSlides__imageContainer, {
            [styles.bannerSlides__imageContainerBlack]: index === 0,
          })}
          key={slide.id}
        >
          {isTablet && (
            <div className={styles.bannerSlides__infoContainer}>
              <div className={styles.bannerSlides__info}>
                <div className={styles.bannerSlides__textContainer}>
                  <h1 className={styles.bannerSlides__infoTitle}>
                    {slide.title}
                  </h1>

                  <p className={styles.bannerSlides__infoDescription}>
                    {slide.description}
                  </p>
                </div>

                <button className={styles.bannerSlides__infoButton}>
                  {slide.buttonText}
                </button>
              </div>
            </div>
          )}
          <img
            src={isTablet ? slide.image[0] : slide.image[1]}
            className={styles.bannerSlides__image}
            alt={`Image ${index}`}
          ></img>
        </div>
      ))}
    </div>
  );
};
