import React, { useRef, useState } from 'react';
import styles from './SectionDashSlider.module.scss';

export const SectionDashSlider: React.FC = () => {
  const [active, setActive] = useState(1);
  const totalPictureNumber = 5;
  const startTouch = useRef<number>(0);
  const endTouch = useRef<number>(0);

  const handlerTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startTouch.current = e.touches[0].clientX;
  };

  const handlerTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    endTouch.current = e.touches[0].clientX;
  };

  const handlerTouchEnd = () => {
    if (startTouch.current - endTouch.current > 40) {
      setActive(prevState => (prevState + 1) % totalPictureNumber);
    }

    if (startTouch.current - endTouch.current < -40) {
      setActive(
        prevState => (prevState - 1 + totalPictureNumber) % totalPictureNumber,
      );
    }
  };

  console.log(active);
  return (
    <section className={styles['slider']}>
      <h1 className={styles['slider__title']}>
        Welcome to Nice Gadgets store!
      </h1>
      <div
        onTouchStart={handlerTouchStart}
        onTouchEnd={handlerTouchEnd}
        onTouchMove={handlerTouchMove}
        className={styles['slider__container']}
        // style={{transform: `translateX()`}}
        style={{
          transform: `translateX(-${active * 100}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        <img
          className={`${styles.slider__pic} ${styles['slider__pic--1']}`}
          src=".\img\phones\apple-iphone-14-pro\spaceblack\00.webp"
          alt="Gadget 1"
        />
        <img
          className={`${styles.slider__pic} ${styles['slider__pic--2']}`}
          src=".\img\phones\apple-iphone-14-pro\spaceblack\01.webp"
          alt="Gadget 2"
        />
        <img
          className={`${styles.slider__pic} ${styles['slider__pic--3']}`}
          src=".\img\phones\apple-iphone-14-pro\spaceblack\02.webp"
          alt="Gadget 3"
        />
        <img
          className={`${styles.slider__pic} ${styles['slider__pic--4']}`}
          src=".\img\phones\apple-iphone-14-pro\spaceblack\03.webp"
          alt="Gadget 4"
        />
        <img
          className={`${styles.slider__pic} ${styles['slider__pic--5']}`}
          src=".\img\phones\apple-iphone-14-pro\spaceblack\04.webp"
          alt="Gadget 5"
        />
      </div>

      <div className="slider__picker">
        <div
          className={`${styles['slider__dash']} ${styles['slider__dash-1']}`}
        ></div>
        <div
          className={`${styles['slider__dash']} ${styles['slider__dash-2']}`}
        ></div>
        <div
          className={`${styles['slider__dash']} ${styles['slider__dash-3']}`}
        ></div>
        <div
          className={`${styles['slider__dash']} ${styles['slider__dash-4']}`}
        ></div>
        <div
          className={`${styles['slider__dash']} ${styles['slider__dash-5']}`}
        ></div>
      </div>
    </section>
  );
};
