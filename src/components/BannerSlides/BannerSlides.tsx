import { useMediaQuery } from 'react-responsive';
import styles from './BannerSlides.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../utils/ts/baseURL';

export const BannerSlides = () => {
  const isTablet = useMediaQuery({ minWidth: 640 });
  const { bannerSlides } = useContext(AppContext)!;

  return (
    <div className={styles.bannerSlides__imageSlider}>
      {bannerSlides.map((slide, index) => (
        <div
          className={classNames(styles.bannerSlides__imageContainer, {
            [styles.bannerSlides__imageContainerBlack]: false,
          })}
          key={slide.id}
        >
          {isTablet && (
            <div className={styles.bannerSlides__infoContainer}>
              <div className={styles.bannerSlides__info}>
                <div className={styles.bannerSlides__textContainer}>
                  <h2 className={styles.bannerSlides__infoTitle}>
                    {slide.title}
                  </h2>

                  <p className={styles.bannerSlides__infoDescription}>
                    {slide.description}
                  </p>
                </div>

                <Link
                  to={slide.buttonLink}
                  className={styles.bannerSlides__infoButton}
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          )}
          <img
            src={
              isTablet
                ? `${baseUrl}/${slide.image[0]}`
                : `${baseUrl}/${slide.image[1]}`
            }
            className={styles.bannerSlides__image}
            alt={`Image ${index}`}
          ></img>
        </div>
      ))}
    </div>
  );
};
