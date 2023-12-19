/* eslint-disable @typescript-eslint/ban-types */
import { useState, useEffect, SetStateAction } from 'react';
import { ReactSVG } from 'react-svg';

import { useViewport } from '../../helpers/userViewport';

import { Phone } from '../../types/phone';

import './productsslider.scss';
import { ProductCard } from '../ProductCart';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getPhones,
  getSugesstedProducts,
} from '../../api/products';
import { Loader } from '../Loader';
import { LoadingError } from '../LoadingError';

type Props = {
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ title }) => {
  const {
    width, isTabletLaptopSize, isMobileSize, isDesktopSize,
  }
    = useViewport();

  const [products, setProducts] = useState<Phone[]>([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isRightDisabled = (itemIndex + 1) * itemsVisible >= products.length;
  const isLeftDisabled = itemIndex * itemsVisible <= 0;

  useEffect(() => {
    let fetchFunction;

    switch (title) {
      case 'Hot prices':
        fetchFunction = getHotPriceProducts;
        break;
      case 'Brand new models':
        fetchFunction = getBrandNewProducts;
        break;
      case 'You may also like':
        fetchFunction = getSugesstedProducts;
        break;
      default:
        fetchFunction = getPhones;
    }

    fetchFunction()
      .then((result: SetStateAction<Phone[]>) => {
        if (!result) {
          throw new Error();
        }

        setProducts(result);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, [title]);

  useEffect(() => {
    setItemIndex(0);

    if (isMobileSize) {
      setItemsVisible(1);
    } else if (isTabletLaptopSize) {
      setItemsVisible(2);
    } else if (isDesktopSize) {
      setItemsVisible(4);
    } else {
      setItemsVisible(3);
    }
  }, [isDesktopSize, isMobileSize, isTabletLaptopSize, width]);

  const handleLeftButton = () => {
    setItemIndex((ind) => ind - 1);
  };

  const handleRightButton = () => {
    setItemIndex((ind) => ind + 1);
  };

  return (
    <div
      className="product-slider"
      style={
        {
          '--itemIndex': itemIndex,
          '--itemsVisible': itemsVisible,
        } as React.CSSProperties
      }
    >
      <div className="product-slider__top-actions">
        <h1 className="product-slider__title">{title}</h1>

        <div className="product-slider__button-container">
          <button
            type="button"
            className="product-slider__button"
            onClick={handleLeftButton}
            disabled={isLeftDisabled}
            aria-label="isLeftDisabled"
          >
            <ReactSVG src="img/icons/ArrowLeft.svg" />
          </button>

          <button
            type="button"
            className="product-slider__button"
            onClick={handleRightButton}
            disabled={isRightDisabled}
            aria-label="isRightDisabled"
          >
            <ReactSVG src="img/icons/ArrowRight.svg" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {hasError ? (
            <LoadingError />
          ) : (
            <div className="product-slider__slider-container">
              <div className="product-slider__slider" data-cy="cardsContainer">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
