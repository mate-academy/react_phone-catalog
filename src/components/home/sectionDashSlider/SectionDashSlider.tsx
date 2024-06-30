import React, { useContext, useEffect, useRef, useState } from 'react';
import Styles from './SectionDashSlider.module.scss';
import cn from 'classnames';
import { ContextApp } from '../../../appContext/AppContext';

export const SectionDashSlider: React.FC = () => {
  const { isTablet } = useContext(ContextApp);
  const [active, setActive] = useState(0);
  const totalPictureNumber = 5;
  const startTouch = useRef<number>(0);
  const endTouch = useRef<number>(0);
  const timeoutId = useRef<number>();
  const array = Array.from({ length: 5 }, (_, index) => index);

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

  return (
    <section className={Styles['slider']}>
      <h1 className={Styles['slider__title']}>
        Welcome to Nice Gadgets store!
      </h1>

      {isTablet &&
      (<div>
        <img src="" alt="" />
      </div>)}

      <div
        onTouchStart={handlerTouchStart}
        onTouchEnd={handlerTouchEnd}
        onTouchMove={handlerTouchMove}
        className={Styles['slider__container']}
        style={{
          transform: `translateX(-${active * 100}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {array.map(item => {
          return (
            <img
              key={item}
              className={`${Styles.slider__pic}`}
              src={`./img/phones/apple-iphone-14-pro/spaceblack/0${item}.webp`}
              alt={`Gadget ${item + 1}`}
            />
          );
        })}
      </div>

      <div className={Styles.slider__picker}>
        {array.map(item => {
          return (
            <div
              key={item}
              onClick={() => handlerPicker(item)}
              className={cn(Styles.slider__picker__dash, {
                [Styles.slider__picker__dash__selected]: item === active,
              })}
            ></div>
          );
        })}
      </div>
    </section>
  );
};
