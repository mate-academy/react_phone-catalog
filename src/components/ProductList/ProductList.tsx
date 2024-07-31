import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { Products } from '../Products/Products';
import './ProductList.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ title, products }) => {
  const [transform, setTransform] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [minTransform, setMinTransform] = useState(0);
  const blockRef = useRef<HTMLDivElement>(null);
  const maxTransform = 0;
  let shift: number;

  const updateTransform = () => {
    if (!blockRef.current) {
      return;
    }

    let itemLength = products.length;
    let cardWidth: number;
    const screenWidth = blockRef.current.clientWidth;
    const gap = 16;

    if (screenWidth < 640) {
      cardWidth = 212;
    } else if (screenWidth < 1070) {
      cardWidth = 237;
    } else {
      itemLength -= 1;
      cardWidth = 272;
    }

    shift = cardWidth + gap;

    const size = Math.floor((screenWidth - gap) / shift);

    setMinTransform(-(itemLength - size) * shift);
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
    updateTransform();
  });

  useEffect(() => {
    window.addEventListener('resize', updateTransform);

    return () => {
      window.removeEventListener('resize', updateTransform);
    };
  });

  return (
    <div className="product-list" ref={blockRef}>
      <div className="product-list__top">
        <h2 className="product-list__title">{title}</h2>

        <div className="product-list__buttons">
          <button
            className="product-list__button"
            disabled={transform >= maxTransform}
            onClick={() => handleArrowClick('left')}
          >
            <i className="icon icon--arrow-left"></i>
          </button>
          <button
            className="product-list__button"
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
