import React, { useContext, useEffect, useRef, useState } from 'react';
import Styles from './SectionDashSlider.module.scss';
import cn from 'classnames';
import { ContextApp } from '../../../appContext/AppContext';

export const SectionDashSlider: React.FC = () => {
  const { isTablet } = useContext(ContextApp);
  const [active, setActive] = useState(0);
  const totalPictureNumber = 3;
  const startTouch = useRef<number>(0);
  const endTouch = useRef<number>(0);
  const timeoutId = useRef<number>();
  // const array = Array.from({ length: 5 }, (_, index) => index);

  useEffect(() => {
    timeoutId.current = window.setTimeout(() => {
      setActive(prevState => (prevState + 1) % totalPictureNumber);
    }, 5000);

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [active, totalPictureNumber]);

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

  const handlerPicker = (number: number) => {
    setActive(number);
  };

  const handleNext = () => {
    setActive(prevState => (prevState + 1) % totalPictureNumber);
  };

  const handlePrev = () => {
    setActive(prevState =>
      prevState > 0 ? prevState - 1 : totalPictureNumber - 1,
    );
  };

  return (
    <>
      <h1 className={Styles.title}>Welcome to Nice Gadgets store!</h1>

      <section className={Styles['slider']}>
        
        {isTablet && (
          <div onClick={handleNext} className={Styles.slider__right}></div>
        )}

        <div
          className={Styles['slider__container']}
          onTouchStart={handlerTouchStart}
          onTouchEnd={handlerTouchEnd}
          onTouchMove={handlerTouchMove}
        >
          {isTablet ? (
            <>
              <img
                style={{
                  transform: `translateX(-${active * 100}%)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
                className={`${Styles.slider__pic}`}
                src={'./img/main-slider1.webp'}
                alt={`baner img`}
              />
              <img
                style={{
                  transform: `translateX(-${active * 100}%)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
                className={`${Styles.slider__pic}`}
                src={'./img/main-slider2.webp'}
                alt={`baner img`}
              />
              <img
                style={{
                  transform: `translateX(-${active * 100}%)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
                className={`${Styles.slider__pic}`}
                src={'./img/main-slider3.webp'}
                alt={`baner img`}
              />
            </>
          ) : (
            <>
              <img
                style={{
                  transform: `translateX(-${active * 100}%)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
                className={`${Styles.slider__pic}`}
                src={'./img/banner-accessories.png'}
                alt={`baner img`}
              />
              <img
                style={{
                  transform: `translateX(-${active * 100}%)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
                className={`${Styles.slider__pic}`}
                src={'./img/banner-phones.png'}
                alt={`baner img`}
              />
              <img
                style={{
                  transform: `translateX(-${active * 100}%)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
                className={`${Styles.slider__pic}`}
                src={'./img/banner-tablets.png'}
                alt={`baner img`}
              />
            </>
          )}
        </div>

        {isTablet && (
          <div onClick={handlePrev} className={Styles.slider__left}></div>
        )}

        {/* <div className={Styles.slider__picker}>
          <div
            onClick={() => handlerPicker(0)}
            className={cn(Styles.slider__picker__dash, {
              [Styles.slider__picker__dash__selected]: 0 === active,
            })}
          ></div>

          <div
            onClick={() => handlerPicker(1)}
            className={cn(Styles.slider__picker__dash, {
              [Styles.slider__picker__dash__selected]: 1 === active,
            })}
          ></div>

          <div
            onClick={() => handlerPicker(2)}
            className={cn(Styles.slider__picker__dash, {
              [Styles.slider__picker__dash__selected]: 2 === active,
            })}
          ></div>
        </div> */}
      </section>

      <div className={Styles.slider__picker}>
        <div
          onClick={() => handlerPicker(0)}
          className={cn(Styles.slider__picker__dash, {
            [Styles.slider__picker__dash__selected]: 0 === active,
          })}
        ></div>

        <div
          onClick={() => handlerPicker(1)}
          className={cn(Styles.slider__picker__dash, {
            [Styles.slider__picker__dash__selected]: 1 === active,
          })}
        ></div>

        <div
          onClick={() => handlerPicker(2)}
          className={cn(Styles.slider__picker__dash, {
            [Styles.slider__picker__dash__selected]: 2 === active,
          })}
        ></div>
      </div>
    </>
  );
};
