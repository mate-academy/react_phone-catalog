import React from 'react';
import { Phone } from './Phone';

export const SliderPhones = ({
  phones,
  frameSize,
  position,
  animationDuration,
  itemWidth,
  marginsWidth,
}: SliderProps) => (
  <div
    className="slider"
    style={{width: `${frameSize * itemWidth + marginsWidth}px`}}
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
);
