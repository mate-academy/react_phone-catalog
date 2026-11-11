import React, { useState, useEffect, useRef } from 'react';
import styles from './Slider.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Slider = ({ children }: Props) => {
  const items = React.Children.toArray(children);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    setCurrent((index + items.length) % items.length);
  };

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();

    return () => clearInterval(timerRef.current!);
  }, []);

  const handleDotClick = (i: number) => {
    goTo(i);
    startTimer();
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__container}>
        <button
          className={`${styles.slider__btn} ${styles['slider__btn--prev']}`}
          onClick={() => {
            goTo(current - 1);
            startTimer();
          }}
        ></button>
        <div className={styles.slider__track}>{items[current]}</div>
        <button
          className={`${styles.slider__btn} ${styles['slider__btn--next']}`}
          onClick={() => {
            goTo(current + 1);
            startTimer();
          }}
        ></button>
      </div>

      <div className={styles.slider__dots}>
        {items.map((_, i) => (
          <span
            key={i}
            className={styles.slider__dot_wrapper}
            onClick={() => handleDotClick(i)}
          >
            <span
              className={`${styles.slider__dot} ${i === current ? styles.slider__dot_active : ''}`}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
