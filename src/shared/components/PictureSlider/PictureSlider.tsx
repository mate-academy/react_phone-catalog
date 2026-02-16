import type { Slider } from '../../../modules/HomePage/types/Slider';
import { handleSwipe } from '../../utils/handleSwipe';
import classNames from 'classnames';
import './PictureSlider.scss';
import { useEffect, useRef, useState } from 'react';

export const PictureSlider = ({
  imgs,
  ShowDotsImg,
}: Omit<Slider, 'start' | 'end'>) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const start = useRef<number | null>(null); 
  const end = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % imgs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imgs.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    start.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    end.current = e.changedTouches[0].clientX;
    handleSwipe({
      start,
      end,
      imgs,
      onCurrentIndex: setCurrentIndex,
    });
  };

  const handleNextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % imgs.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + imgs.length) % imgs.length);
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (currentIndex !== index) {
      setCurrentIndex(index);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={classNames('slider-main-content', {
        'slider-main-content-img-dots': ShowDotsImg,
      })}
    >
      <div className="slider-img-container">
        <button
          className="prev"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
        >
          <img src="img/home/slider/prev.svg" alt="" />
        </button>
        <img
          src={`${imgs[currentIndex]}`}
          alt=""
          className={classNames('slider-main-content-images', {
            'main-product-img': ShowDotsImg,
          })}
        />
        <button
          className="next"
          onClick={handleNextSlide}
          aria-label="Next slide"
        >
          <img src="img/home/slider/next.svg" alt="" />
        </button>
      </div>

      <div
        className={classNames('nav-dots', {
          'nav-dots-wrapper': ShowDotsImg,
        })}
      >
        {imgs.map((item, index) => (
          <button
            key={index}
            onClick={e => handleDotClick(index, e as React.MouseEvent)}
            onTouchEnd={e => e.stopPropagation()}
            className={classNames('nav-links', {
              'img-links': ShowDotsImg,
              'nav-links-active': currentIndex === index,
            })}
            aria-label={`Go to slide ${index + 1}`}
          >
            {ShowDotsImg && (
              <img src={`${item}`} className="img-dots" alt={`${item}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
