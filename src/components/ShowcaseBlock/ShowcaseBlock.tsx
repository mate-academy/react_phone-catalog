import React from 'react';
import { SliderProducts } from './SliderProducts';
import { SliderControl } from './SliderControl';
import { useShowcaseBlock } from '../_hooks/useShowcaseBlock';
import { Heading } from '../Heading/Heading';

export const ShowcaseBlock = ({ title }: HeadingProps) => {
  const {
    currentProducts,
    position,
    step,
    itemWidth,
    animationDuration,
    handleSlide,
    maxPosition,
    productCardRef,
    frameSize,
  } = useShowcaseBlock(title);

  return (
    <>
      <div className="section__heading-container">
        <Heading title={title} />
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
        itemWidth={itemWidth}
        frameSize={frameSize}
        animationDuration={animationDuration}
        productCardRef={productCardRef}
      />
    </>
  );
};
