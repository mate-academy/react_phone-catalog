import React, { useMemo } from 'react';
import { SliderProducts } from './SliderProducts';
import { SliderControl } from './SliderControl';
import { Heading } from '../Heading/Heading';
import { DIRECTIONS } from '../../common/constants';
import { useShowcaseBlock } from '../_hooks/useShowcaseBlock';

export const ShowcaseBlock = ({ title, selectedProduct }: ShowcaseBlockProps) => {
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
  } = useShowcaseBlock(title, selectedProduct);

  const sliderVisibleWidth = useMemo(
    () => (frameSize * itemWidth),
    [frameSize, itemWidth],
  );

  const controlsAreHidden = useMemo(
    () => (sliderVisibleWidth < currentProducts.length * itemWidth),
    [currentProducts, itemWidth, sliderVisibleWidth],
  );

  return (
    <>
      <div className="section__heading-container">
        <Heading title={title} />
        {controlsAreHidden && (
          <div className="slider__controls">
            <SliderControl
              handleSlide={handleSlide}
              direction={DIRECTIONS.left}
              position={position}
              maxPosition={maxPosition}
            />
            <SliderControl
              handleSlide={handleSlide}
              direction={DIRECTIONS.right}
              position={position}
              maxPosition={maxPosition}
            />
          </div>
        )}
      </div>
      <SliderProducts
        products={currentProducts}
        position={position}
        step={step}
        animationDuration={animationDuration}
        productCardRef={productCardRef}
        sliderVisibleWidth={sliderVisibleWidth}
      />
    </>
  );
};
