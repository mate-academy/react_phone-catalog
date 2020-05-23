import React from 'react';
import { Phone } from './Phone';

export const SliderPhones = ({
  phones,
  frameSize,
  position,
  animationDuration,
  itemWidth,
}: SliderProps) => (
  <div className="slider">
    <div
      className="slider__container"
      style={{ width: `${frameSize * itemWidth}px` }}
    >
      <div
        className="slider__list"
        style={{
          transform: `translateX(${position}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {phones.map((phone: Phone) => (
          <Phone key={phone.id} {...phone} />
        ))}
      </div>
    </div>
  </div>
);
