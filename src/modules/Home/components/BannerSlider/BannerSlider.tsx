import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './BannerSlider.module.scss';
import { ArrowUpIcon } from '../../../shared/components/Icons';
import { useBannerSlider } from './useBannerSlider';

interface Props {
  banners: { img: string; link: string; alt: string }[];
}

export const BannerSlider: React.FC<Props> = ({ banners }) => {
  const {
    currentIndex,
    setCurrentIndex,
    handleNext,
    handlePrev,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useBannerSlider(banners.length);

  return (
    <div className={styles.container}>
      <div className={styles.mainRow}>
        <button
          type="button"
          className={classNames(styles.button, styles.buttonPrev)}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <span className="icon icon--left">
            <ArrowUpIcon />
          </span>
        </button>

        <div
          className={styles.window}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map(banner => (
              <Link key={banner.img} to={banner.link} className={styles.slide}>
                <img
                  src={`${import.meta.env.BASE_URL}/${banner.img}`}
                  alt={banner.alt}
                  className={styles.image}
                />
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={classNames(styles.button, styles.buttonNext)}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <span className="icon icon--right">
            <ArrowUpIcon />
          </span>
        </button>
      </div>

      <div className={styles.dots}>
        {banners.map((banner, index) => (
          <button
            key={banner.img}
            type="button"
            className={classNames(styles.dot, {
              [styles.dotActive]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
