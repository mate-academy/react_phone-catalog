import React, { useEffect, useState } from 'react';
import style from './SwiperBaner.module.scss';

import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';

type Props = {
  slides: string[];
  interval?: number;
};

export const SwiperBaner: React.FC<Props> = ({ slides, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length, interval]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className={style.slider}>
      <div className={style.slider__container}>
        <button className={style.slider__arrow} onClick={prevSlide}>
          <img
            src={ArrowLeft}
            alt="Previous slide"
            className={style.slider__arrow__icon}
          />
        </button>

        <ul className={style.slider__list}>
          {slides.map((slide, index) => (
            <li
              className={`${style.slider__item} ${
                index === currentSlide ? style.active : ''
              }`}
              key={index}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className={style.slider__image}
              />
            </li>
          ))}
        </ul>

        <button className={style.slider__arrow} onClick={nextSlide}>
          <img
            src={ArrowRight}
            alt="Next slide"
            className={style.slider__arrow__icon}
          />
        </button>
      </div>

      <div className={style.slider__indicators}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${style.slider__dot} ${index === currentSlide ? style.slider__activeDot : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};
