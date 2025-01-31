import React, { useEffect, useRef, useState } from 'react';

import styles from './Slider.module.scss';
import classNames from 'classnames';

interface SliderProps {
  data: { id: number; img: string }[]; // Масив слайдів
  slidesToShow: number; // Скільки слайдів показувати
  autoPlay?: boolean; // Автоматичне перемикання
  autoPlayInterval?: number; // Інтервал для автоперемикання
}

const Slider: React.FC<SliderProps> = ({
  data,
  slidesToShow,
  autoPlay = false,
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Обчислюємо ширину слайда
  const slideWidth = 100 / slidesToShow;

  // Автоматичне перемикання
  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex + 1 >= data.length ? 1 : prevIndex + 1,
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, data.length]);

  // Ручне перемикання
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.slider}>
      <div
        className={styles.slider__track}
        style={{
          transform: `translateX(-${currentIndex * slideWidth}%)`,
          width: `${data.length * slideWidth}%`,
        }}
        ref={sliderRef}
      >
        {data.map(item => (
          <div
            className={styles.slider__slide}
            key={item.id}
            style={{ width: `${slideWidth}%` }}
          >
            <h2>some slide {item.id}</h2>
            <div>
              <img src={item.img} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.slider__controls}>
        {data.map((_, index) => (
          <button
            key={index}
            className={classNames(styles.slider__control, {
              [styles.slider__control_active]: currentIndex === index,
            })}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
