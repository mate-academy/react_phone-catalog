import React from 'react';
import { SliderProducts } from './SliderProducts';
import { SliderControl } from './SliderControl';
import { useShowcaseBlock } from './hooks/useShowcaseBlock';
import { Heading } from './Heading';

export const ShowcaseBlock = ({ heading }: HeadingProps) => {
  const {
    currentProducts,
    position,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    handleSlide,
    maxPosition,
  } = useShowcaseBlock(heading);

  return (
    <>
      <div className="section__heading-container">
        <Heading heading={heading} />
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
      <SliderProducts
        products={currentProducts}
        position={position}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </>
  );
};
