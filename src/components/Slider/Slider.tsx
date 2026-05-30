import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Slider.module.scss';
import cn from 'classnames';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import arrowLeft from '../../assets/icons/Chevron (Arrow Left).svg';
import arrowRight from '../../assets/icons/Chevron (Arrow Right).svg';
import dotActive from '../../assets/icons/dot-active.svg';
import dotInactive from '../../assets/icons/dot-inactive.svg';

type Props = {
  images: string[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
};

export const Slider: React.FC<Props> = ({
  images,
  autoPlay = false,
  autoPlayDelay = 4000,
}) => {
  const [current, setCurrent] = useState(0);

  const goToSlide = (index: number) => {
    setCurrent((index + images.length) % images.length);
  };

  const nextSlide = () => {
    goToSlide(current + 1);
  };

  const prevSlide = () => {
    goToSlide(current - 1);
  };

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const timer = setTimeout(() => {
      nextSlide();
    }, autoPlayDelay);

    return () => clearTimeout(timer);
  }, [current, autoPlay, autoPlayDelay]);

  // Связываем каждую картинку с категорией
  const categoryLinks = ['/phones', '/tablets', '/accessories'];

  return (
    <section className={styles.sliderWrapper}>
      <div className={styles.slider}>
        <button className={styles.arrowLeft} onClick={prevSlide}>
          <img src={arrowLeft} alt="Previous" />
        </button>

        <div className={styles.slide}>
          <NavLink to={categoryLinks[current]}>
            <img
              src={images[current]}
              alt={`Slide ${current + 1}`}
              className={cn(styles.slideImage, {
                [styles.adjustedSecond]: current === 1,
                [styles.adjustedThird]: current === 2,
              })}
            />
          </NavLink>
        </div>

        <button className={styles.arrowRight} onClick={nextSlide}>
          <img src={arrowRight} alt="Next" />
        </button>
      </div>

      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <div key={index} className={styles.dotWrapper}>
            <button
              key={index}
              className={cn(styles.dotButton, {
                [styles.activeDot]: index === current,
              })}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <img
                src={index === current ? dotActive : dotInactive}
                alt={index === current ? 'Active dot' : 'Inactive dot'}
                className={styles.dotImage}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
