import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import './ProductSlider.scss';
import { Icon } from '../Icon';
import { IconType } from '../../types/IconTypes';
import { ProductCard } from '../ProductCard';
import {
  productCardWidth,
  productsGap,
} from '../../helpers/constants';
import { Colors } from '../../types/Colors';
import { Loader } from '../Loader';

interface Props {
  products: Product[];
  title?: string;
  isLoading?: boolean;
}

const productCardFullWidth = productCardWidth + productsGap;

export const ProductSlider: React.FC<Props> = ({
  products,
  title = '',
  isLoading = false,
}) => {
  const productsListWidth = useMemo(() => (
    productCardFullWidth * products.length - productsGap
  ), [products]);
  const productsWrapper = useRef<HTMLDivElement>(null);
  const [productsWrapperWidth, setProductWrapperWidth] = useState(0);
  const maxPosition = useMemo(() => {
    return productsListWidth - productsWrapperWidth;
  }, [productsListWidth, productsWrapperWidth]);

  const positions = useMemo(() => {
    const result = [
      ...products
        .map((_product, i) => {
          return productCardFullWidth * i;
        })
        .filter((position) => position < maxPosition),
    ];

    if (maxPosition - result[result.length - 1] > 30) {
      result.push(maxPosition);
    }

    return result;
  }, [maxPosition, products]);

  const [positionIndex, setPositionIndex] = useState(0);
  const position = useMemo(
    () => positions[positionIndex],
    [positions, positionIndex],
  );

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleWrapperResize = () => {
      if (productsWrapper.current) {
        setProductWrapperWidth(productsWrapper.current.clientWidth);
      }
    };

    window.addEventListener('resize', handleWrapperResize);

    handleWrapperResize();

    return () => {
      window.removeEventListener('resize', handleWrapperResize);
    };
  });

  const moveToPrev = useCallback(() => {
    if (positionIndex > 0) {
      setPositionIndex(prevPos => prevPos - 1);
    }
  }, [positionIndex]);

  const moveToNext = useCallback(() => {
    if (positionIndex < positions.length - 1) {
      setPositionIndex(prevPos => prevPos + 1);
    }
  }, [positionIndex, positions]);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      setTouchStart(event.touches[0].clientX);
    }, [],
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      setTouchEnd(event.touches[0].clientX);
    }, [],
  );

  const handleTouchEnd = useCallback(() => {
    if (touchEnd - touchStart > 50) {
      moveToPrev();
    } else if (touchStart - touchEnd > 50) {
      moveToNext();
    }
  }, [touchStart, touchEnd, moveToNext, moveToPrev]);

  const isLeftButtonDisabled = useMemo(
    () => position === positions[0],
    [position, positions],
  );

  const isRightButtonDisabled = useMemo(
    () => position === positions[positions.length - 1],
    [position, positions],
  );

  return (
    <section className="product-slider">
      <div className="product-slider__content">
        <div className="product-slider__top">
          {title && (
            <h2 className="title">
              {title}
            </h2>
          )}

          <div className="product-slider__buttons">
            <button
              type="button"
              className={classNames(
                'product-slider__button',
                'product-slider__button--left',
                {
                  'product-slider__button--disabled': isLeftButtonDisabled,
                },
              )}
              aria-label="button to move slider to left"
              onClick={moveToPrev}
              disabled={isLeftButtonDisabled}
            >
              {isLeftButtonDisabled ? (
                <Icon iconType={IconType.arrowLeft} color={Colors.disabled} />
              ) : (
                <Icon iconType={IconType.arrowLeft} />
              )}
            </button>

            <button
              type="button"
              className={classNames(
                'product-slider__button',
                'product-slider__button--right',
                {
                  'product-slider__button--disabled': isRightButtonDisabled,
                },
              )}
              aria-label="button to move slider to right"
              onClick={moveToNext}
            >
              {isRightButtonDisabled ? (
                <Icon
                  iconType={IconType.arrowRight}
                  color={Colors.disabled}
                />
              ) : (
                <Icon iconType={IconType.arrowRight} />
              )}
            </button>
          </div>
        </div>

        {isLoading && (
          <Loader />
        )}

        <div
          ref={productsWrapper}
          className="product-slider__wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ul
            className="product-slider__products"
            style={{
              transform: `translateX(-${position}px)`,
              gap: `${productsGap}px`,
            }}
          >
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
