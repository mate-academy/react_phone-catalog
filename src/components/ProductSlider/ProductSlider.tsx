import { useState, useMemo } from 'react';
import './style.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Phone } from '../../types/Phone';
import { Settings } from '../../types/Settings';
import { Titles } from '../../types/Titles';

type Props = {
  title: Titles;
  products: Phone[];
  isOnSale?: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  products, isOnSale = true, title,
}) => {
  const [offset, setOffset] = useState(0);
  const [settings] = useState<Settings>({
    itemWidth: 272,
    step: 4,
    frameSize: 4,
    gap: 16,
    animationDuration: 500,
    infinite: true,
  });

  const {
    itemWidth, step, frameSize, gap, animationDuration, infinite,
  } = settings;

  const hiddenItems = useMemo(() => {
    const hiddenItemsLength = products.length - frameSize;

    return (hiddenItemsLength * itemWidth)
      + ((hiddenItemsLength - 1) * gap);
  }, [products, settings]);

  const showPrev = () => {
    setOffset(Math.min(offset + (itemWidth * step)
      + ((step) * gap), 0));

    if (offset === 0) {
      setOffset(-hiddenItems);
    }
  };

  const showNext = () => {
    setOffset(Math.max(
      (offset - itemWidth * step)
      - ((step) * gap), -hiddenItems,
    ));

    if (offset === -hiddenItems && infinite) {
      setOffset(0);
    }
  };

  const maxItemsOnPage = (products.length - frameSize)
    * itemWidth;
  const containerWidth = (frameSize * itemWidth)
    + ((frameSize - 1) * gap);

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h1 className="product-slider__title">{title}</h1>
        <div className="product-slider__buttons">
          <button
            type="button"
            onClick={showPrev}
            className="product-slider__button"
            disabled={offset === 0}
          >
            <img
              src="../icons/chevron-left.svg"
              alt="Left arrow"
            />
          </button>

          <button
            type="button"
            onClick={showNext}
            className="product-slider__button"
            disabled={offset === -maxItemsOnPage && !infinite}
          >
            <img
              src="../icons/chevron-right.svg"
              alt="Left arrow"
            />
          </button>
        </div>
      </div>
      <div
        className="product-slider__container"
        style={{
          width: `${containerWidth}px`,
          gap: `${gap}px`,
        }}
      >
        {products.map(phone => (
          <div
            className="product-slider__item"
            key={phone.id}
            style={{
              transform: `translateX(${offset}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <ProductCard
              product={phone}
              isOnSale={isOnSale}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
