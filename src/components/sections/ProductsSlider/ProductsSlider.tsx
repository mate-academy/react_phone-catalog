import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ProductType } from '../../../types/ProductType';
import { Icon } from '../../Icon';
import { Product } from '../../Product';
import './ProductsSlider.scss';

type Props = {
  className?: string;
  title: string;
  products: ProductType[];
};

export const ProductsSlider: React.FC<Props> = ({
  className = '',
  title,
  products,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [frameSize, setFrameSize] = useState(1);

  // const frameSize = 1;
  const step = 1;
  const gap = 16;
  const animationDuration = 1000;

  useLayoutEffect(() => {
    const resizeUpdating = () => {
      if (wrapperRef.current) {
        setWrapperWidth(wrapperRef.current.clientWidth);
      }

      if (listRef.current) {
        const firstItem = listRef.current.querySelector('li');

        if (firstItem && wrapperRef.current) {
          setItemWidth(firstItem.clientWidth);
        }
      }

      // currentIndex + frameSize > products.length - frameSize

      if (false) {
        setCurrentIndex(currentIndex - step);
      }
    };

    resizeUpdating();
    window.addEventListener('resize', resizeUpdating);

    return () => {
      window.removeEventListener('resize', resizeUpdating);
    };
  }, [currentIndex, frameSize, itemWidth, products.length, wrapperWidth]);

  useEffect(() => {
    setFrameSize(Math.floor(wrapperWidth / (itemWidth + gap)));
  }, [itemWidth, wrapperWidth]);

  const prev = useCallback(() => {
    setCurrentIndex(currentIndex === 1 ? 0 : currentIndex - step);
  }, [currentIndex]);

  const next = useCallback(() => {
    // console.log(currentIndex);
    setCurrentIndex(currentIndex + step);
  }, [currentIndex]);

  const translateX =
    currentIndex === products.length - frameSize
      ? products.length * (itemWidth + gap) -
        itemWidth -
        gap -
        (wrapperWidth - itemWidth)
      : currentIndex * (itemWidth + gap);

  // TOUCH

  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || startX === null) {
      return;
    }

    const deltaX = e.touches[0].clientX - startX;

    if (deltaX > 50 && currentIndex !== 1) {
      prev();
      setIsDragging(false);
    } else if (deltaX < -50 && currentIndex < products.length - step) {
      next();
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  return (
    <section
      className={`products-slider section ${className}`.trim()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container">
        <div className="products-slider__top">
          <h2 className="products-slider__title title">{title}</h2>

          <div className="products-slider__buttons">
            <button
              className="products-slider__button"
              type="button"
              disabled={currentIndex === 0}
              onClick={prev}
            >
              <Icon iconName="icon-arrow-left" />
            </button>
            <button
              className="products-slider__button"
              type="button"
              disabled={currentIndex >= products.length - frameSize}
              onClick={next}
            >
              <Icon iconName="icon-arrow-right" />
            </button>
          </div>
        </div>

        <div className="products-slider__wrapper" ref={wrapperRef}>
          <ul
            className="products-slider__list"
            style={{
              transform: `translateX(-${translateX}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
            ref={listRef}
          >
            {products.map(product => (
              <li className="products-slider__item" key={product.id}>
                <Product product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
