import styles from './BannerSlider.module.scss';
import banner1_d from '../../../../img/banner-iphone17pro_colors.jpg';
import banner1_m from '../../../../img/banner-iphone_17_pro_mob.jpg';
import banner2_d from '../../../../img/banner-ipad.jpg';
import banner2_m from '../../../../img/banner-ipad_mob.jpg';
import banner3_d from '../../../../img/banner-accessories.jpeg';
import banner3_m from '../../../../img/banner-accessories_mob.jpeg';
// eslint-disable-next-line max-len
import { SliderLeftBigButton } from '../../../../shared/ui/buttons/sliderLeftBIg';
// eslint-disable-next-line max-len
import { SliderRightBigButton } from '../../../../shared/ui/buttons/sliderRigthBig';
import { useRef, useState } from 'react';

const bannersArrow = [
  {
    id: 1,
    title: 'Banner phones',
    imageDesktop: banner1_d,
    imageMobile: banner1_m,
  },
  {
    id: 2,
    title: 'Banner tablets',
    imageDesktop: banner2_d,
    imageMobile: banner2_m,
  },
  {
    id: 3,
    title: 'Banner accessories',
    imageDesktop: banner3_d,
    imageMobile: banner3_m,
  },
];

export const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const total = bannersArrow.length;
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const MIN_SWIPE_DISTANCE = 50;

  const handleNext = () => {
    setCurrentIndex((prev: number) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev: number) => (prev - 1 + total) % total);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > MIN_SWIPE_DISTANCE) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const currentBanner = bannersArrow[currentIndex];

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContent}>
        <div className={styles.slider}>
          <SliderLeftBigButton onLeftButton={handlePrev} />
          <div
            className={styles.banner}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <picture>
              <source
                media="(max-width: 639px)" // до планшета
                srcSet={currentBanner.imageMobile}
              />
              <img
                src={currentBanner.imageDesktop}
                alt={currentBanner.title}
                className={styles.img}
              />
            </picture>
          </div>
          <SliderRightBigButton onRightButton={handleNext} />
        </div>
        <div className={styles.dashes}>
          {bannersArrow.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => goToSlide(index)}
              className={
                index === currentIndex
                  ? styles.dashButtonActive
                  : styles.dashButton
              }
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};
