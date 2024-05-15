import React, { useState, useEffect } from 'react';
// import './Carousel.scss';
import { Product } from '../../types/Product';
import { SliderSettings } from '../../types/SliderSettings';
import { ProductCard } from '../ProductCard';

type Props = {
  items: Product[];
  settings: SliderSettings;
  title: string; // corrected to lowercase "string"
};

const ProductSlider: React.FC<Props> = ({ items, settings, title }) => {
  const { visibleSlides, step, animationDuration, infinite } = settings;

  // Calculate item width based on the number of visible slides
  const itemWidth = 100 / visibleSlides;

  const [position, setPosition] = useState(0);
  const lastPosition = -(items.length - visibleSlides);
  const nextDisabled = position === lastPosition && !infinite;
  const prevDisabled = position === 0 && !infinite;

  // Calculate frame size based on the number of visible slides
  const frameSize =
    items.length <= visibleSlides ? items.length : visibleSlides;

  const listStyles = {
    transform: `translateX(${position * itemWidth}%)`, // Updated to percentage
    transition: `transform ${animationDuration}ms`,
    width: `${frameSize * itemWidth}%`, // Updated width calculation
  };

  const handlePrev = () => {
    const newPosition =
      position < 0 ? Math.min(position + step, 0) : lastPosition;

    setPosition(newPosition);
  };

  const handleNext = () => {
    const newPosition =
      position === lastPosition ? 0 : Math.max(position - step, lastPosition);

    setPosition(newPosition);
  };

  useEffect(() => {
    // Ensure position stays within bounds when items change
    if (position < lastPosition) {
      setPosition(lastPosition);
    }
  }, [items, lastPosition, position]);

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h2 className="product-slider__title">{title}</h2>

        <div className="product-slider__buttons">
          <button
            className="product-slider__button"
            onClick={handlePrev}
            disabled={prevDisabled}
          >
            <i className="icon icon--arrow-left"></i>
          </button>
          <button
            className="product-slider__button"
            onClick={handleNext}
            disabled={nextDisabled}
          >
            <i className="icon icon--arrow-right"></i>
          </button>
        </div>
      </div>
      <div className="product-slider__carousel">
        <ul className="product-slider__list" style={listStyles}>
          {items.map(item => (
            <li key={item.id} style={{ width: `${itemWidth}%` }}>
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSlider;
