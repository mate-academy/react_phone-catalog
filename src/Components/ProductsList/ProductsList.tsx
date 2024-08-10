import { useEffect, useRef, useState } from 'react';
import { Product } from '../../Types/Product';
import { Products } from '../Products/Products';
import './ProductsList.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ title, products }) => {
  const [transform, setTransform] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [minTransform, setMinTransform] = useState(0);
  const blockRef = useRef<HTMLDivElement>(null);
  const maxTransform = 0;
  let shift: number;

  const updateTransfrom = () => {
    if (!blockRef.current) {
      return;
    }

    let itemsLength = products.length;
    let cardWidth: number;
    const screenWidth = blockRef.current.clientWidth;
    const gap = 16;

    if (screenWidth < 640) {
      cardWidth = 212;
    } else if (screenWidth < 1070) {
      cardWidth = 237;
    } else {
      itemsLength -= 1;
      cardWidth = 272;
    }

    shift = cardWidth + gap;

    const size = Math.floor((screenWidth - gap) / shift);

    setMinTransform(-(itemsLength - size) * shift);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      if (transform >= maxTransform) {
        return;
      }

      setTransform(current => current + shift);
    }

    if (direction === 'right') {
      if (transform <= minTransform) {
        return;
      }

      setTransform(current => current - shift);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 0) {
      handleArrowClick('right');
    }

    if (diff < 0) {
      handleArrowClick('left');
    }

    setTouchStart(0);
  };

  useEffect(() => {
    updateTransfrom();
  });

  useEffect(() => {
    window.addEventListener('resize', updateTransfrom);

    return () => {
      window.removeEventListener('resize', updateTransfrom);
    };
  });

  return (
    <div className="products-list" ref={blockRef}>
      <div className="products-list__top">
        <h2 className="products-list__title">{title}</h2>

        <div className="products-list__buttons">
          <button
            className="products-list__button"
            disabled={transform >= maxTransform}
            onClick={() => handleArrowClick('left')}
          >
            <i className="icon icon--arrow-left"></i>
          </button>
          <button
            className="products-list__button"
            disabled={transform <= minTransform}
            onClick={() => handleArrowClick('right')}
          >
            <i className="icon icon--arrow-right"></i>
          </button>
        </div>
      </div>

      <Products
        products={products}
        type="slider"
        cardTransform={transform}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};
