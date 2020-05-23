import React from 'react';
import { SliderPhones } from './SliderPhones';
import { SliderControl } from './SliderControl';
import { useHotPrices } from './hooks/useHotPrices';

export const HotPrices = () => {
  const {
    hotPricesPhones,
    position,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    handleSlide,
    maxPosition,
  } = useHotPrices();

  return (
    <>
      <div className="section__heading-container">
        <h1>Hot prices</h1>
        <div className="slider__controls">
          <SliderControl
            handleSlide={handleSlide}
            direction="left"
            position={position}
            maxPosition={maxPosition}

          />
          <SliderControl
            handleSlide={handleSlide}
            direction="right"
            position={position}
            maxPosition={maxPosition}
          />
        </div>
      </div>
      <SliderPhones
        phones={hotPricesPhones}
        position={position}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </>
  );
};
