import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './BannerSlider.module.scss';

import {
  bannerImages,
  sliderBtnsIndex,
} from '../../../../helpers/bannerImages';
import { icons } from '../../../../shared/global/Icons';

export const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('');

  const navigate = useNavigate();

  const getScreenSize = (width: number) => {
    if (width <= 639) {
      return 'small';
    }

    if (width <= 1199) {
      return 'medium';
    }

    return 'large';
  };

  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;

      setScreenSize(getScreenSize(width));
    };

    checkWidth();

    window.addEventListener('resize', checkWidth);

    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  const updateIndex = (newIndex: number) => {
    const visibleSlidesCount = 1;

    const slidesCount = bannerImages.length / 3;
    const maxIndex = slidesCount - visibleSlidesCount;

    let updatedIndex = newIndex;

    if (newIndex < 0) {
      updatedIndex = maxIndex;
    } else if (newIndex > maxIndex) {
      updatedIndex = 0;
    }

    setActiveIndex(updatedIndex);
  };

  useEffect(() => {
    setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 5000);
  }, [activeIndex]);

  const getSlidesWrapperStyleTranslateX = () => ({
    transform: `translateX(${-(activeIndex * 100)}%)`,
  });

  return (
    <section className={styles.bannerSlider}>
      {screenSize === 'small' && (
        <div
          className={styles.sliderWrapper}
          style={getSlidesWrapperStyleTranslateX()}
        >
          {bannerImages.slice(0, 3).map(({ src, alt, link }, index) => (
            <img
              key={index}
              src={src}
              alt={alt}
              onClick={() => navigate(link)}
              className={styles.bannerItem}
            />
          ))}
        </div>
      )}

      {screenSize !== 'small' && (
        <div className={styles.mediumSlider}>
          <button
            className={styles.arrowBtn}
            onClick={() => updateIndex(activeIndex - 1)}
          >
            {icons.arrowLeft}
          </button>

          <div className={styles.sliderContainer}>
            <div
              className={styles.sliderWrapper}
              style={getSlidesWrapperStyleTranslateX()}
            >
              {bannerImages
                .slice(
                  screenSize === 'large' ? -3 : 3,
                  screenSize === 'large' ? undefined : 6,
                )
                .map(({ src, alt, link }, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={alt}
                    className={styles.bannerItem}
                    onClick={() => navigate(link)}
                  />
                ))}
            </div>
          </div>

          <button
            onClick={() => updateIndex(activeIndex + 1)}
            className={styles.arrowBtn}
          >
            {icons.arrowRight}
          </button>
        </div>
      )}

      <div className={styles.bannerBtnsWrapper}>
        {sliderBtnsIndex.map(index => (
          <button
            key={index}
            type="button"
            className={classNames(styles.bannerBtns, {
              [styles.active]: activeIndex === index,
            })}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
