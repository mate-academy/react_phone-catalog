import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../shared/components/ProductCard';
import './ProductsSlider.scss';
import { IconButton } from '../../../shared/components/Buttons/IconButton';

type Props = {
  title: string;
  items: Product[];
  showDiscount: boolean;
  className: string;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  items,
  showDiscount,
  className,
}) => {
  const [currentItem, setCurrentItem] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentItem(0);
  }, [items]);

  const offsetLehgth = (): number => {
    if (track.current) {
      const trackLength = track.current.scrollWidth;
      const result = (((trackLength + 16) / items.length) * 100) / trackLength;

      return result;
    }

    return 10;
  };

  //#region track movement functions

  const nextSlide = useCallback(() => {
    setCurrentItem(current => {
      return current + 1;
    });
  }, []);

  const pastSlide = useCallback(() => {
    setCurrentItem(current => {
      return current - 1;
    });
  }, []);

  //#endregion

  return (
    <div className={`product-slider ${className}`}>
      <div className="product-slider__header">
        <h2 className="product-slider__title">{title}</h2>
        <div className="product-slider__controls">
          <IconButton
            className="product-slider__button"
            onClick={() => pastSlide()}
            name="arrow-left"
            disabled={currentItem === 0}
          />
          <IconButton
            className="product-slider__button"
            onClick={() => nextSlide()}
            name="arrow-right"
            disabled={currentItem === items.length - 1}
          />
        </div>
      </div>
      <div className="product-slider__wrapper-window">
        <div className="product-slider__window">
          <div
            className="product-slider__track"
            style={{
              transform: `translateX(-${currentItem * offsetLehgth()}%)`,
            }}
            ref={track}
          >
            {items.map(item => (
              <ProductCard
                item={item}
                key={item.id}
                className="product-slider__product-card"
                showDiscount={showDiscount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
