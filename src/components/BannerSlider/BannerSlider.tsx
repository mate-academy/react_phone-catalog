import { useCallback, useEffect, useRef, useState } from 'react';
import style from './BannerSlider.module.scss';

const BannerSlider = () => {
  const slides = [
    { id: 1, image: '/img/slider/slide-1.jpg' },
    { id: 2, image: '/img/slider/slide-2.jpg' },
    { id: 3, image: '/img/slider/slide-3.jpg' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
  }, [slides.length]);

  const goPrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    resetInterval();
  };

  const goNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    resetInterval();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetInterval();
  };

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  const showDots = slides.map((_, index) => (
    <li
      key={index}
      className={`${style.dot} ${currentSlide === index ? style.active : ''}`}
      onClick={() => goToSlide(index)}
    ></li>
  ));

  return (
    <div className="container">
      <section className={style.slider}>
        <div className={style.sliders}>
          <button className={style.btn} onClick={goPrev}>
            <img
              className={style.arrow}
              src="/img/icons/arrow-left.svg"
              alt="Left"
            />
          </button>
          <div
            className={style.slide}
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          ></div>
          <button className={style.btn} onClick={goNext}>
            <img
              className={style.arrow}
              src="/img/icons/arrow-right.svg"
              alt="Right"
            />
          </button>
        </div>
        <ul className={style.dots}>{showDots}</ul>
      </section>
    </div>
  );
};

export default BannerSlider;
