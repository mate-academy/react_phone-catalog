import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';
import { PicturesSlide as Slide } from '../PicturesSlide/PicturesSlide';
import { PagesPath } from '../../../../types/PagesPath';
import { PicturesSlide } from '../../../../types/PicturesSlide';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from '../../../shared/Icons/Arrow/Arrow';

const slidesData: PicturesSlide[] = [
  {
    title: 'Iphone 14 Pro',
    subTitle: 'Pro.Beyond.',
    imgBig: '/public/img/banner/iphone-14-pro.webp',
    link: PagesPath.Phones,
  },
  {
    imgBig: '/public/img/banner/ipad-01.jpeg',
    link: PagesPath.Tablets,
  },
  {
    imgBig: '/public/img/banner/apple-watch-series-9.jpg',
    link: PagesPath.Accessories,
  },
];

export const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swipeStartX, setSwipeStartX] = useState(0);
  const timerId = useRef(0);

  const handlePrevSlide = () => {
    setCurrentSlide(current => {
      if (current === 0) {
        return slidesData.length - 1;
      }

      return current - 1;
    });
  };

  const handleNextSlide = () => {
    setCurrentSlide(current => {
      if (current === slidesData.length - 1) {
        return 0;
      }

      return current + 1;
    });
  };

  useEffect(() => {
    window.clearInterval(timerId.current);

    timerId.current = window.setInterval(() => {
      handleNextSlide();
    }, 5000);
  }, [currentSlide]);

  const handleSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    const swipeEndX = event.changedTouches[0].clientX;

    if (swipeEndX - swipeStartX > 100) {
      handlePrevSlide();
    } else if (swipeStartX - swipeEndX > 100) {
      handleNextSlide();
    }

    setSwipeStartX(0);
  };

  return (
    <div className={styles.PicturesSlider}>
      <div className={styles.PicturesSlider__content}>
        <button
          className={styles.PicturesSlider__button}
          onClick={handlePrevSlide}
        >
          <Arrow />
        </button>

        <div className={styles.PicturesSlider__slider}>
          <div
            className={styles.PicturesSlider__allSlides}
            style={{
              transform: `translate(calc((-100% * ${currentSlide}) - (5px * ${currentSlide})))`,
            }}
            onTouchStart={event =>
              setSwipeStartX(event.changedTouches[0].clientX)
            }
            onTouchEnd={handleSwipe}
          >
            {slidesData.map(slide => (
              <Slide key={slide.imgBig} slide={slide} />
            ))}
          </div>
        </div>

        <button
          className={styles.PicturesSlider__button}
          onClick={handleNextSlide}
        >
          <Arrow orientation="right" />
        </button>
      </div>

      <div className={styles.PicturesSlider__bottomBtns}>
        {slidesData.map((slide, index) => (
          <button
            key={slide.imgBig}
            className={classNames(styles.PicturesSlider__bottomBtn, {
              [styles.PicturesSlider__bottomBtn_active]: index === currentSlide,
            })}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
