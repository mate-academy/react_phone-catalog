import styles from './PicturesSlider.module.scss';
import cn from 'classnames';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IconButton } from 'components/IconButton';
import { Banner } from 'types/Banner';
import { useCallback, useEffect, useState } from 'react';

type PicturesSliderProps = {
  banners: Banner[];
};

export const PicturesSlider = ({ banners }: PicturesSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex(prevIndex =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = useCallback(() => {
    setActiveIndex(prevIndex =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
    );
  }, [banners]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <div className={styles.container__content__button}>
          <IconButton
            onClick={goToPrevious}
            icon={<FiChevronLeft size={24} />}
            useBorder={true}
            borderColor={'#B4BDC3'}
            width={'32px'}
          />
        </div>

        {banners.length > 0 && banners[activeIndex] && (
          <img
            key={banners[activeIndex].id}
            src={banners[activeIndex].img}
            alt="Banner"
            className={styles.carouselImage}
          />
        )}

        <div className={styles.container__content__button}>
          <IconButton
            onClick={goToNext}
            icon={<FiChevronRight size={24} />}
            useBorder={true}
            borderColor={'#B4BDC3'}
            width={'32px'}
          />
        </div>
      </div>

      <div className={styles.container__counter}>
        {banners.map((_, index) => (
          <div
            key={index}
            className={cn(
              styles.container__counter__item,
              index === activeIndex && styles.active,
            )}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
