import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import style from './Slider.module.scss';
import '../../../../mainStyles.scss';
import classNames from 'classnames';

const slides = [
  {
    src: '/img/banner-accessories.png',
    link: '/page1',
  },
  {
    src: '/img/banner-phones.png',
    link: '/page2',
  },
  {
    src: '/img/banner-tablets.png',
    link: '/page3',
  },
];

export const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className={style.slider}>
      <div className="container">
        <div className={style.slider_container}>
          <button
            className={classNames(style.button, style.button_prev)}
            onClick={handlePrev}
          >
            &#8249;
          </button>

          <div className={style.image_wrapper} {...swipeHandlers}>
            <div
              className={style.image_container}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={classNames(style.slide, {
                    [style.active]: index === currentIndex,
                  })}
                >
                  <img className={style.img} src={slide.src} alt={`Slide ${index + 1}`} />
                </div>
              ))}
              <div className={style.text_wrapper}>
                <p className={style.text}>Now avialable in our store!</p>
                <p className={style.description}>Be the first!</p>

                <button
                  className={style.text_button}
                  onClick={() =>
                    (window.location.href = slides[currentIndex].link)
                  }
                >
                  Order now
                </button>
              </div>
            </div>
          </div>
          <button
            className={classNames(style.button, style.button_next)}
            onClick={handleNext}
          >
            &#8250;
          </button>
        </div>
        <div className={style.indicators}>
          <div className={style.indicators_wrapper}>
            {slides.map((_, index) => (
              <span
                key={index}
                className={classNames(style.slider__indicator, {
                  [style.active]: index === currentIndex,
                })}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
