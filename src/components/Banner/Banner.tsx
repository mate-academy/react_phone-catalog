import React, { useEffect, useState } from 'react';
import style from './Banner.module.scss';
import { Slide } from '../../types/SlideType';
import { getSlidesData } from '../../api/serviceApi';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

export const Banner: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    getSlidesData().then(slide => setSlides(slide));
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const touchEndX = moveEvent.changedTouches[0].clientX;
      const deltaX = touchStartX - touchEndX;

      if (deltaX > 50) {
        nextSlide();
      } else if (deltaX < -50) {
        prevSlide();
      }

      document.removeEventListener('touchmove', handleTouchMove);
    };

    document.addEventListener('touchmove', handleTouchMove as EventListener);
  };

  if (!slides) {
    return <Loader />;
  }

  return (
    <div className={style.carousel} onTouchStart={handleTouchStart}>
      <div className={style.carousel__wrapeer}>
        {' '}
        <button
          className={`${style.carousel__button} ${style.prev}`}
          onClick={prevSlide}
        >
          <div className={style.carousel__button_prev}></div>
        </button>
        <div className={style.carousel__content}>
          {slides.map((img, index) => (
            <Link
              to={img.url}
              key={img.id}
              className={`${style.carousel__img} ${
                index === currentIndex ? style.active : style.inactive
              }`}
            >
              <img src={img.image} alt={`Slide ${index + 1}`} />
            </Link>
          ))}
        </div>
        <button
          className={`${style.carousel__button} ${style.next}`}
          onClick={nextSlide}
        >
          <div className={style.carousel__button_next}></div>
        </button>
      </div>

      <div className={style.carousel__indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${style.carousel__indicator} ${
              currentIndex === index ? style.active : ''
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};
