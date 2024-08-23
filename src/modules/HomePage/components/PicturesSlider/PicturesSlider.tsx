import { Icon } from '../../../../components/Icon';
import { SliderBanner } from '../../../../types/SliderBanner';
import { Banner } from '../Banner';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  className?: string;
  banners: SliderBanner[];
  step: number;
  animationDuration: number;
  infinite: boolean;
};

export const PicturesSlider: React.FC<Props> = ({
  className = '',
  banners,
  step,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const prev = useCallback(() => {
    if (infinite) {
      if (currentIndex !== 0) {
        return setCurrentIndex(currentIndex - step);
      }

      return setCurrentIndex(banners.length - 1);
    }

    return setCurrentIndex(currentIndex === 1 ? 0 : currentIndex - step);
  }, [currentIndex, banners.length, step, infinite]);

  const next = useCallback(() => {
    if (infinite) {
      if (currentIndex + step < banners.length) {
        return setCurrentIndex(currentIndex + step);
      }

      return setCurrentIndex(0);
    }

    return setCurrentIndex(
      currentIndex + step >= banners.length
        ? banners.length
        : currentIndex + step,
    );
  }, [currentIndex, step, banners.length, infinite]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex + step < banners.length) {
        return setCurrentIndex(currentIndex + step);
      }

      return setCurrentIndex(0);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, banners.length, step, infinite]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || startX === null) {
      return;
    }

    const deltaX = e.touches[0].clientX - startX;

    if (deltaX > 50 && currentIndex > 0) {
      prev();
      setIsDragging(false);
    } else if (deltaX < -50 && currentIndex < banners.length - step) {
      next();
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  return (
    <div
      className={`pictures-slider ${className}`.trim()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        className="pictures-slider__button"
        type="button"
        disabled={!infinite && currentIndex < 1}
        onClick={prev}
      >
        <Icon iconName="icon-arrow-left" />
      </button>
      <div className="pictures-slider__wrapper">
        <ul
          className="pictures-slider__list"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {banners.map(banner => (
            <li className="pictures-slider__item" key={banner.title}>
              <Banner
                title={banner.title}
                subTitle={banner.subTitle}
                href={banner.href}
                src={banner.img}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        className="pictures-slider__button"
        type="button"
        disabled={!infinite && currentIndex + step >= banners.length}
        onClick={next}
      >
        <Icon iconName="icon-arrow-right" />
      </button>

      <ul className="pictures-slider__dots">
        {banners.map((banner, index) => (
          <li className="pictures-slider__dots-item" key={banner.title}>
            <button
              className={`pictures-slider__dots-dot ${index === currentIndex ? 'pictures-slider__dots-dot--active' : ''}`}
              type="button"
              onClick={() => handleDotClick(index)}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
};
