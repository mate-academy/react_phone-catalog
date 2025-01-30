import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getSlidesData } from '../../../../api/api';
import { Slide } from '../../../../types';
import { SlideControls } from './components/SliderControls/SliderControls';
import { BannerSlide } from './components/BannerSlide/BannerSlide';
import './BannerSlider.scss';
import { Loader } from '../../../../components';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const BannerSlider: React.FC<Props> = ({ className }) => {
  const [slides, setSlides] = useState<Slide[] | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [deltaX, setDeltaX] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

  const sliderRef = useRef<HTMLDivElement>(null);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = useCallback(() => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }

    if (slides) {
      autoSlideInterval.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
      }, 5000);
    }
  }, [slides]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getSlidesData();

        setSlides(data);
      } catch {
        throw new Error('Failed to fetch slides:');
      }
    };

    fetchSlides();

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);

    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) {
      return;
    }

    const moveX = e.touches[0].clientX - startX;

    setDeltaX(moveX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (slides) {
      if (deltaX > 50 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (deltaX < -50 && currentIndex < slides.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setDeltaX(0);
    startAutoSlide();
  };

  const handleControlClick = (index: number) => {
    setCurrentIndex(index);

    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }

    startAutoSlide();
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(slides ? slides.length - 1 : 0);
    }

    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }

    startAutoSlide();
  };

  const handleNextClick = () => {
    if (slides) {
      if (currentIndex < slides.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }

    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }

    startAutoSlide();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [startAutoSlide]);

  if (!slides) {
    return <Loader />;
  }

  return (
    <section className={classNames(className, 'banner-slider')}>
      <button
        className="banner-slider__button banner-slider__button--prev"
        onClick={handlePrevClick}
        aria-label="Previous slide"
      >
        &lt;
      </button>

      <div className="banner-slider__wrapper">
        <div
          className="banner-slider__slides"
          ref={sliderRef}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${deltaX}px))`,
            transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides &&
            slides.map((slide, index) => (
              <BannerSlide
                key={slide.id}
                slide={slide}
                isActive={index === currentIndex}
                isMobile={isMobile}
              />
            ))}
        </div>
      </div>

      <button
        className="banner-slider__button banner-slider__button--next"
        onClick={handleNextClick}
        aria-label="Next slide"
      >
        &gt;
      </button>
      <SlideControls
        slides={slides}
        currentIndex={currentIndex}
        handleControlClick={handleControlClick}
      />
    </section>
  );
};
