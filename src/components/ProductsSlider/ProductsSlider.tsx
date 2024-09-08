import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ProductType } from '../../types/ProductType';
import { Icon } from '../Icon';
import { Product } from '../Product';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';

type Props = {
  className?: string;
  title: string;
  products: ProductType[];
  showDiscount?: boolean;
  isLoading: boolean;
  errorMessage: string;
};

export const ProductsSlider: React.FC<Props> = ({
  className = '',
  title,
  products,
  showDiscount = true,
  isLoading,
  errorMessage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [frameSize, setFrameSize] = useState(1);
  const [prevFrameSize, setPrevFrameSize] = useState(frameSize);

  const [step, setStep] = useState(1);
  const gap = 16;
  const animationDuration = 1000;

  useLayoutEffect(() => {
    const resizeUpdating = () => {
      if (wrapperRef.current) {
        setWrapperWidth(wrapperRef.current.clientWidth);
      }

      if (listRef.current) {
        const firstItem = listRef.current.querySelector('li');

        if (firstItem) {
          setItemWidth(firstItem.clientWidth);
        }
      }

      if (currentIndex > Math.max(products.length - frameSize, 0)) {
        setCurrentIndex(Math.max(products.length - frameSize, 0));
      }

      if (frameSize !== prevFrameSize) {
        setPrevFrameSize(frameSize);
      }

      if (window.innerWidth >= 1200) {
        setStep(4);
      } else if (window.innerWidth >= 768) {
        setStep(3);
      } else {
        setStep(1);
      }
    };

    resizeUpdating();
    window.addEventListener('resize', resizeUpdating);

    return () => {
      window.removeEventListener('resize', resizeUpdating);
    };
  }, [
    currentIndex,
    frameSize,
    itemWidth,
    prevFrameSize,
    products.length,
    wrapperWidth,
  ]);

  useEffect(() => {
    setFrameSize(Math.ceil(wrapperWidth / (itemWidth + gap)));
  }, [itemWidth, wrapperWidth]);

  const prev = useCallback(() => {
    setCurrentIndex(currentIndex === 1 ? 0 : currentIndex - step);
  }, [currentIndex, step]);

  const next = useCallback(() => {
    setCurrentIndex(currentIndex + step);
  }, [currentIndex, step]);

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

    if (deltaX > 50 && currentIndex >= 1) {
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
          <h2 className="products-slider__title section-title">{title}</h2>

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

        {isLoading && <Loader />}

        {!isLoading && (
          <>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

            {!products.length && !errorMessage && (
              <span className="notification">
                {`No ${title.toLowerCase()} yet`}
              </span>
            )}

            {!!products.length && (
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
                      <Product product={product} showDiscount={showDiscount} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
