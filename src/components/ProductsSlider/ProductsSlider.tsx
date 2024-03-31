import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard';
import { GRID_GAP } from '../../helpers/constants';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const firstSlideRef = useRef<HTMLLIElement>(null);
  const [slideWidth, setSlideWidth] = useState<number | null>(null);
  const isLastSlide = currentIndex === products.length - 1;
  const isFirstSlide = currentIndex === 0;

  useEffect(() => {
    const containerRef = slidesContainerRef.current;
    const firstSlideElementRef = firstSlideRef.current;

    const updateContainerWidth = () => {
      if (containerRef) {
        setContainerWidth(containerRef.offsetWidth);
      }
    };

    updateContainerWidth();

    if (!isFirstRender && firstSlideElementRef) {
      setSlideWidth(firstSlideElementRef.offsetWidth);
    } else {
      setIsFirstRender(false);
    }

    window.addEventListener('resize', updateContainerWidth);

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const scssVariables = {
    '--width': `${containerWidth}px`,
  };

  return (
    <div
      className="product-slider"
      style={scssVariables as React.CSSProperties}
    >
      <div className="product-slider__content">
        <div className="product-slider__top">
          <h2 className="product-slider__title">{title}</h2>

          <div className="product-slider__buttons">
            <button
              type="button"
              className={cn('product-slider__arrow', {
                'product-slider__arrow--disabled': isFirstSlide,
              })}
              onClick={goToPrevious}
              disabled={isFirstSlide}
            >
              <div
                className={cn('icon icon--arrow-left', {
                  'icon--arrow-left-disabled': isFirstSlide,
                })}
              />
            </button>
            <button
              type="button"
              className={cn('product-slider__arrow', {
                'product-slider__arrow--disabled': isLastSlide,
              })}
              onClick={goToNext}
              disabled={isLastSlide}
            >
              <div
                className={cn('icon icon--arrow-right', {
                  'icon--arrow-right-disabled': isLastSlide,
                })}
              />
            </button>
          </div>
        </div>

        <div
          className="product-slider__slides-container"
          ref={slidesContainerRef}
        >
          <ul
            className="product-slider__slides"
            style={{ transform: `translateX(-${currentIndex * ((slideWidth || 0) + GRID_GAP)}px)` }}
          >
            {products.map((product, index) => {
              return (
                <li
                  className="product-slider__slide"
                  key={product.id}
                  ref={index === 0 ? firstSlideRef : undefined}
                >
                  <ProductCard product={product} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
