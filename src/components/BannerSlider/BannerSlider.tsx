import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BannerSliderItem } from 'types/bannerSliderTypes';
import { ArrowLeftIcon } from '@components/Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@components/Icons/ArrowRightIcon';
import { useSwipe } from '@hooks/useSwipe';

import cn from 'classnames';
import styles from './BannerSlider.module.scss';

interface BannerSliderProps {
  data: BannerSliderItem[];
}

export const BannerSlider = ({ data }: BannerSliderProps) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setSlide(prevSlide => (prevSlide === data.length - 1 ? 0 : prevSlide + 1));
  }, [data.length]);

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
  });

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.carousel__wrapper}>
        <button className={cn(styles.arrow, 'button-icon')} onClick={prevSlide}>
          <ArrowLeftIcon />
        </button>
        {data.map((slideData, idx) => (
          <div
            key={idx}
            className={cn(styles.carousel__slide, {
              [styles.hidden]: idx !== slide,
            })}
          >
            {'type' in slideData && slideData.type === 'main' ? (
              <div className={styles.banner}>
                <div className={styles.banner__left}>
                  <h2 className={styles.banner__title}>
                    {slideData.title}
                    <span className={styles.banner__icon}></span>
                  </h2>
                  <p className={styles.banner__subtitle}>
                    {slideData.subtitle}
                  </p>
                  <Link to={slideData.link} className={styles.banner__btn}>
                    {slideData.textBtn}
                  </Link>
                </div>
                <div className={styles.banner__right}>
                  <h2 className={styles.banner__mobile_title}>
                    {slideData.title}
                  </h2>
                  <h4 className={styles.banner__phone_name}>
                    {slideData.phoneName}
                  </h4>
                  <p className={styles.banner__tag}>{slideData.tagName}</p>
                  <img src={slideData.image} alt={slideData.alt} />
                </div>
              </div>
            ) : (
              <Link to={slideData.link}>
                <div className={styles.slides}>
                  <img src={slideData.image} alt={slideData.alt} />
                </div>
              </Link>
            )}
          </div>
        ))}
        <button className={cn(styles.arrow, 'button-icon')} onClick={nextSlide}>
          <ArrowRightIcon />
        </button>
      </div>

      <span className={styles.carousel__indicators}>
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={cn(styles.carousel__indicator, {
                [styles.inactive]: idx !== slide,
              })}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
