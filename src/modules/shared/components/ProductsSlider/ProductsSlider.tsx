import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../shared/components/ProductCard';
import './ProductsSlider.scss';
import { IconButton } from '../../../shared/components/Buttons/IconButton';
import { breakpoint } from '../../../../utils/breakpoint';

type Props = {
  title: string;
  items: Product[];
  showDiscount: boolean;
  className: string;
};

function getShowCards(width: number): number {
  if (width > breakpoint.md) {
    return 4;
  } else if (width > breakpoint.m) {
    return 3;
  } else if (width > breakpoint.sm) {
    return 2;
  }

  return 1;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  items,
  showDiscount,
  className,
}) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [showCards, setShowCards] = useState(() =>
    getShowCards(window.innerWidth),
  );
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > breakpoint.md) {
        setShowCards(4);
      } else if (width > breakpoint.m) {
        setShowCards(3);
      } else if (width > breakpoint.sm) {
        setShowCards(2);
      } else {
        setShowCards(1);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            disabled={currentItem <= 0}
          />
          <IconButton
            className="product-slider__button"
            onClick={() => nextSlide()}
            name="arrow-right"
            disabled={currentItem >= items.length - showCards}
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
