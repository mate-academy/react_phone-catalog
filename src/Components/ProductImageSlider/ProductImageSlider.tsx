import React, { useState } from 'react';
import './ProductImageSlider.scss';
import cn from 'classnames';
import { useTranslationState } from '../../stateManagers/languageState';
import { useThemeState } from '../../stateManagers/themeState';

type ProductImageSliderProps = {
  images: string[];
};

export const ProductImageSlider: React.FC<ProductImageSliderProps> = ({
  images,
}) => {
  const { translate } = useTranslationState();
  const { theme } = useThemeState();

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || !images.length) {
    return (
      <div className="product-main-slider__empty body-text">
        {translate('No images')}
      </div>
    );
  }

  return (
    <div className={`product-image-slider product-image-slider--${theme}`}>
      <div
        className="product-image-slider__thumbnails"
        role="list"
      >
        {images.map((image, index) => (
          <button
            key={index}
            className={cn('product-image-slider__thumbnail', {
              selected: selectedIndex === index,
            })}
            onClick={() => setSelectedIndex(index)}
            aria-label={`Show image ${index + 1}`}
            tabIndex={0}
            role="listitem"
            type="button"
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
            />
          </button>
        ))}
      </div>
      <div>
        <img
          src={images[selectedIndex]}
          alt={`Main product photo ${selectedIndex + 1}`}
          className="product-image-slider__main-img"
        />
      </div>
    </div>
  );
};
