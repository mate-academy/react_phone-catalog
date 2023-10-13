import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsSlider.scss';

type Props = {
  products: Product[];
};

const CARD_WIDTH = 272;
const ITEMS_GAP = 16;

const getSlidesShown = (
  containerWidth: number,
  slideWidth: number,
  gapWidth: number,
) => {
  let totalWidth = slideWidth;
  let slides = 0;

  while (totalWidth <= containerWidth) {
    slides += 1;
    totalWidth += gapWidth + slideWidth;
  }

  return slides;
};

export const ProductsSlider: React.FC<Props> = ({ products }) => {
  const [shiftedElements, setShiftedElements] = useState(0);
  const shift = useMemo(() => {
    return shiftedElements * CARD_WIDTH + shiftedElements * ITEMS_GAP;
  }, [shiftedElements]);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const slidesShown = getSlidesShown(sliderWidth, CARD_WIDTH, ITEMS_GAP);
  const wrapperWidth = CARD_WIDTH * slidesShown + (slidesShown - 1) * ITEMS_GAP;

  function getPrev() {
    setShiftedElements(shiftedElements - slidesShown >= 0
      ? shiftedElements - slidesShown
      : 0);
  }

  function getNext() {
    const itemsLeft = products.length - shiftedElements - slidesShown;

    if (itemsLeft) {
      setShiftedElements(itemsLeft > slidesShown
        ? shiftedElements + slidesShown
        : shiftedElements + itemsLeft);
    }
  }

  useEffect(() => {
    const sliderObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setSliderWidth(Math.floor(entry.contentRect.width));
      });
    });

    if (sliderRef.current) {
      sliderObserver.observe(sliderRef.current);
    }

    return () => {
      sliderObserver.disconnect();
    };
  }, []);

  return (
    <div className="ProductsSlider" ref={sliderRef}>
      <div className="ProductsSlider__buttons">
        <button
          type="button"
          aria-label="Previous"
          className="button button--prev"
          onClick={getPrev}
          disabled={!shiftedElements}
        />

        <button
          type="button"
          aria-label="Next"
          className="button button--next"
          onClick={getNext}
          disabled={shiftedElements === products.length - slidesShown}
        />
      </div>
      <div className="ProductsSlider__wrapper" style={{ width: wrapperWidth }}>
        <div
          className="ProductsSlider__content"
          style={{ transform: `translateX(-${shift}px)` }}
          data-cy="cardsContainer"
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
